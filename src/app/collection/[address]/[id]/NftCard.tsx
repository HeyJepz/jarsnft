"use client";

import React, { useEffect, useState } from "react";
import { useNftContext } from "./nft-provider";
import { NFT, ThirdwebNftMedia, useValidDirectListings } from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew, MdVerified } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BoringAvatar } from "@/components/(interfaces)";
import { displayName, shortenAddress, truncate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import BuyButton from "./BuyButton";
import { getMaticPriceInPHP } from "@/lib/core/coingecko";
import SellButton from "./SellButton";

export default function NftCard({ address, id }: { address: string; id: string; }) {
  const [amountInPhp, setAmountInPhp] = useState<string>("");
  const [filteredNft, setFilteredNft] = useState<NFT | undefined>();
  const {
    nft,
    loadingNft,
    collection,
    loadingCollection,
    marketPlaceContract,
    loadingMarketplace,
    connectedAddress,
    ownedNFTs,
    loadingOwnedNFTs
  } = useNftContext();
  const { data: listings, isLoading: loadingListings } = useValidDirectListings(
    marketPlaceContract,
    {
      tokenContract: address,
      tokenId: id,
    },
  );
  const router = useRouter();

  useEffect(() => {
    if (listings && listings[0]) {
      getMaticPriceInPHP(listings[0].currencyValuePerToken.displayValue).then(
        (result) => {
          setAmountInPhp(result);
        },
      );
    }
  }, [listings, loadingListings]);

  useEffect(() => {
    if(ownedNFTs) {
      setFilteredNft(ownedNFTs.find((nft) => nft.metadata.id === id));
    }
  }, [ownedNFTs, loadingOwnedNFTs, connectedAddress]);

  if (loadingCollection) {
    return <div>Loading collection...</div>;
  }

  if (loadingMarketplace) {
    return <div>Loading marketplace...</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 w-full lg:col-span-5">
        <div className="flex w-full flex-col gap-4 py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="rounded-full px-3"
              onClick={(e) => router.back()}
            >
              <MdArrowBackIosNew className="text-medium" />
            </Button>
            <Image
              className="rounded-full"
              src={collection.image}
              width={25}
              height={25}
              alt=""
            />
            <p className="hover:underline">
              <Link href={`/collection/${address}`}>{collection.name}</Link>
            </p>
            <MdVerified className="text-lg text-blue-500" />
          </div>

          {nft ? (
            <h1 className="text-4xl font-bold">{nft.metadata.name}</h1>
          ) : (
            <Skeleton className="h-9 w-28" />
          )}

          <div className="flex items-center gap-2">
            <BoringAvatar name={nft?.owner} size={35} />
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Owned by
              </p>
              {nft ? (
                <p className="cursor-pointer text-medium font-bold hover:underline">
                  {nft.owner ? displayName(nft.owner) : "Not logged in"}
                </p>
              ) : (
                <Skeleton className="h-4 w-8" />
              )}
            </div>
          </div>

          <Card className="">
            <CardContent className="w-full p-5">
              <div className="grid grid-cols-2">
                <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Current Price
                  </p>
                  <div className="flex flex-col justify-center gap-1">
                    {loadingListings ? (
                      <Skeleton className="h-10 w-28" />
                    ) : listings && listings[0] ? (
                      <div className="flex items-center gap-1">
                        <Image
                          src="/assets/cryptocurrency/polygon-matic.png"
                          width={20}
                          height={20}
                          alt="Polygon"
                        />
                        <p className="text-2xl font-bold">
                          {listings[0].currencyValuePerToken.displayValue}
                          <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                            {" "}
                            (PHP {amountInPhp})
                          </span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-2xl font-bold">
                        N/A
                        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                          (Not Listed)
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1 ">
                  {loadingListings ? (
                    <div className="flex w-full flex-col gap-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {filteredNft ? (
                        <SellButton nft={nft} contractAddress={address} />
                      ): listings && listings[0] && (
                        <BuyButton nft={nft} listings={listings} />
                      )}
                      {/* <Button className="w-full" variant="outline" disabled>
                        Make Offer
                      </Button> */}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="col-span-12 flex h-full w-full justify-center bg-accent/50 py-0 md:py-12 lg:col-span-7">
        {nft &&
          (nft.metadata.image ? (
            <ThirdwebNftMedia
              metadata={nft.metadata}
              width="500px"
              height="500px"
              style={{
                minWidth: "320px",
                minHeight: "320px",
                borderRadius: "12px",
              }}
            />
          ) : (
            <Image
              src="/assets/placeholder/nft_placeholder.svg"
              width={500}
              height={500}
              alt="image of an NFT"
            />
          ))}
      </div>
    </div>
  );
}
