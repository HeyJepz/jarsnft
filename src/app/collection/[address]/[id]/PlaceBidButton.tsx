"use client"

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useNftContext } from './nft-provider';
import { type NFT, ThirdwebNftMedia, Web3Button, useBalance, type EnglishAuction } from '@thirdweb-dev/react';
import { MdVerified } from 'react-icons/md';
import { NFT_MARKETPLACE } from '@/types/constant';
import { LoginWelcomeScreen } from '@/components/(interfaces)/ConnectWeb3';
import { toast } from 'sonner';
import { getMaticPriceInPHP } from '@/lib/core/coingecko';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


type PlaceBidButtonProps = {
  nft: NFT | undefined;
  auctionListing: EnglishAuction[] | undefined;
  loadingAuction: boolean;
}

const PlaceBidSchema = z.object({
  bidValue: z.string().min(1, { message: "Bid value is required" }).refine(value => parseFloat(value) > 0, {
    message: "Bid value must be greater than 0"
  }),
})

export default function PlaceBidButton({ nft, auctionListing, loadingAuction }: PlaceBidButtonProps) {
  const router = useRouter();
  const [minBidAmountInPhp, setMinAmountInPhp] = useState<string>("");
  const [bidState, setBidState] = useState<'idle' | 'confirmation' | 'success'>('idle');
  const { marketPlaceContract, collection, balance } = useNftContext();

  const form = useForm<z.infer<typeof PlaceBidSchema>>({
    resolver: zodResolver(PlaceBidSchema),
    defaultValues: {
      bidValue: auctionListing?.[0].minimumBidCurrencyValue.displayValue || "0"
    }
  })

  useEffect(() => {
    if (auctionListing && auctionListing[0]) {
      getMaticPriceInPHP(auctionListing[0].minimumBidCurrencyValue.displayValue).then((result) => {
        setMinAmountInPhp(result);
      });
    }
  }, [auctionListing])

  async function createBidOffer(value: string) {
    let txResult;
    setBidState('confirmation');
    if(!value || 0) {
      setBidState('idle');
      return;
    }

    if(auctionListing?.[0]) {
      txResult = await marketPlaceContract?.englishAuctions.makeBid(
        auctionListing[0].id,
        value
      ).then((data) => {
        setBidState('success');
        toast.success("Bid offer has been created", {
          description: `You bid on ${nft?.metadata.name} for ${form.getValues("bidValue")}`,
          position: "bottom-right",
          duration: 2000,
          onAutoClose(toast) {
            setBidState('idle');
            router.refresh();
          },
        });
      }).catch((e: Error) => {
        // error state
        setBidState("idle");
        if(e.message.includes("Reason: missing revert data in call exception; Transaction reverted without a reason string")) {
          toast.error("Failed to make bid!", {
            description: `Insufficient funds to make bid.`,
            position: "bottom-right",
          })
        } else if(e.message.includes("Reason: user rejected transaction")) {
          toast.error("Failed to make bid!", {
            description: "The user denied the transaction or the transaction failed. Please try again.",
            position: "bottom-right",
          });
        } else {
          toast.error("Failed to make bid!", {
            description: "An error occurred while processing your request. Please try again.",
            position: "bottom-right",
          });
        }
        });
    } else {
      throw new Error("No auction listing found");
    }

    return txResult;
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const invalidChars = ['+', '-', 'e', 'E'];
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = (event.clipboardData).getData('text');
    if (/[eE\+\-\*\/]/.test(paste)) {
      event.preventDefault();
    }
  };

  async function handleOnSubmit(data: z.infer<typeof PlaceBidSchema>) {
    await createBidOffer(data.bidValue);
  }

  return (
    <AlertDialog>

      <AlertDialogTrigger asChild>
        <Button className="w-full" variant="outline">
          Place a bid
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className='min-w-[420px] w-[500px] p-0'>
        {/* Header */}
        <AlertDialogHeader className="px-8 pt-8">
          <div className='flex justify-between items-center'>
            <AlertDialogTitle className="text-2xl font-bold">Place a bid</AlertDialogTitle>
            <AlertDialogCancel className='rounded-full' disabled={bidState != "idle"}>x</AlertDialogCancel>
          </div>
          
          <AlertDialogDescription>
            Make offer to this nft. Click &quot;PLACE BID&quot; to proceed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Body */}
        <div className="flex justify-between px-8 py-4 gap-5">
          {nft?.metadata.image && (
            <ThirdwebNftMedia
              metadata={nft.metadata}
              width='100px'
              height='100px'
              style={{
                maxWidth: '100px',
                maxHeight: '100px',
                minWidth: '100px',
                minHeight: '100px',
              }}
              requireInteraction
              className="rounded-lg bg-accent/50 border border-accent"
            />
          ) || (
            <Image
              src="/assets/placeholder/nft_placeholder.svg"
              width={100}
              height={100}
              alt="image of an NFT"
              className='rounded-lg bg-accent/50 border border-accent'
            />
          )}

          <div className="flex flex-col py-4 w-full gap-2">
            <h1 className='text-xl font-bold'>{nft?.metadata.name}</h1>
            <p className='text-sm text-gray-400 flex gap-1 items-center'>
              {collection.name}
              <MdVerified className=' text-blue-500' />
            </p>
          </div>
        </div>

        {/* Footer */}
        <AlertDialogFooter className="flex sm:flex-col sm:space-x-0 bg-neutral-200 dark:bg-neutral-800 rounded-t-3xl rounded-b-lg px-6 py-8">
          <div className="flex justify-between text-xl font-bold px-4">
            <p>Minimum Bid</p>
            {auctionListing && auctionListing[0] && (
              <p>{auctionListing?.[0].minimumBidCurrencyValue.displayValue} {auctionListing?.[0].minimumBidCurrencyValue.symbol}</p>
            )}
          </div>
          <div className="flex justify-between px-4">
            <p className='text-gray-500'>For 1 NFT</p>
            <p className='text-gray-500'>{minBidAmountInPhp && `PHP ${minBidAmountInPhp}`}</p>
          </div>
          <div className="flex justify-between my-6 px-4">
            <p>Your MATIC balance</p>
            <p>{balance ? `${parseFloat(balance.displayValue).toFixed(3)} ${balance.symbol}` : "Not Logged In" }</p>
          </div>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleOnSubmit)}>
                <FormField
                  control={form.control}
                  name="bidValue"
                  render={({ field }) => (
                    <FormItem className='flex flex-col mb-5'>
                      <FormLabel>Bid Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your bid amount"
                          {...field}
                          onKeyDown={handleKeyDown}
                          onPaste={handlePaste}
                          className='input-class'
                        />
                      </FormControl>
                      <FormMessage className='text-red-600' />
                    </FormItem>
                  )}
                />

                <Web3Button
                  contractAddress={NFT_MARKETPLACE}
                  action={async () => {
                    await form.handleSubmit(handleOnSubmit)();
                  }}
                  onSuccess={(txResult) => {

                  }}
                  style={{
                    width: "100%",
                    fontSize: "14px"
                  }}
                  connectWallet={{
                    btnTitle: "Connect Wallet",
                    modalTitle: "JarsNFT",
                    showThirdwebBranding: false,
                    welcomeScreen: () => <LoginWelcomeScreen />,
                    style: {
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      minWidth: "100px",
                      maxHeight: "53px",
                    },
                    modalTitleIconUrl: "",
                  }}
                >PLACE BID</Web3Button>
              </form>
            </Form>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
