"use client";

import { TooltipMsg } from "@/components/(interfaces)";
import { open_sans } from "@/lib/fonts";
import { cn, shortenAddress, truncate } from "@/lib/utils";
import React, { useState } from "react";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import { AddressClipboard } from "@/components/(interfaces)";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileQuery } from "@/types/users";
import Image from "next/image";
import { StorageProfile } from "@/types";
import BoringAvatar from "@/components/(interfaces)/BoringAvatar";
import { MdOutlineModeEdit } from "react-icons/md";
import { EditModeAvatarDialog } from "./EditModeAvatarDialog";
import useAvatarNFT from "@/hooks/useAvatarNFT";
import { Button } from "@/components/ui/button";
import { RiShare2Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { Tooltip } from "@nextui-org/react";
import useVerifiedProfile from "@/hooks/useVerifiedProfile";
import ShareProfileDialog from "./ShareProfileDialog";

export default function ProfileBanner({ user: userContext }: { user: ProfileQuery }) {
  const { user, isLoading } = userContext;

  const [profile, setProfile] = useState<StorageProfile | undefined>(undefined);
  const [profileLoading, setProfileLoading] = useState(false);
  const [hoverAvatar, setHoverAvatar] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const { avatar, isLoading: loadingAvatar, isError: errorAvatar } = useAvatarNFT();
  const { isVerified, isLoading: loadingVerified } = useVerifiedProfile();

  if (isLoading) {
    return (
      <div className="mb-8 flex w-full flex-col rounded-lg dark:shadow-[inset_0_0px_50px_rgba(10,10,10,1)] md:mt-4">
        <div className="relative h-[200px] w-auto select-none md:h-[300px]">
          <Skeleton className="h-[200px] w-full rounded-lg md:h-[300px]" />
        </div>
        <div className="absolute hidden h-[300px] w-full px-7 py-6 md:block">
          <div className="mb-4 flex justify-between">
            <div className="flex items-center gap-3">
              <div className="">
                <Skeleton className="h-[125px] w-[125px] rounded-full bg-gray-300 dark:bg-zinc-700" />
              </div>
              <div className="flex w-full flex-col gap-1 text-4xl font-bold">
                <Skeleton className="h-8 w-[190px] bg-gray-300 dark:bg-zinc-700" />
                <Skeleton className="h-8 w-[150px] bg-gray-300 dark:bg-zinc-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-40 flex w-full flex-col rounded-lg bg-black/50 dark:shadow-[inset_0_0px_50px_rgba(10,10,10,1)] md:mb-8 md:mt-4">
      {/* Image banner */}
      <div className="relative h-[100px] w-auto md:h-[300px]">
        {!profileLoading ? (
          <Image
            src={profile?.bannerUrl || "/assets/collection_banner.webp"}
            fill
            style={{ objectFit: "cover", opacity: 0.7 }}
            alt="Banner"
            className="rounded-none hover:bg-black md:rounded-lg"
          />
        ) : (
          <Skeleton className="h-[100px] w-full rounded-none md:h-[300px] md:rounded-t-lg" />
        )}
      </div>

      {/* Banner on mobile screen */}
      <div className="absolute left-0 right-0 block h-[250px] w-full md:hidden">
        <div className="mx-4 flex h-full flex-col items-start justify-center">
          <div className="mt-8 flex w-full items-end justify-between">
            <EditModeAvatarDialog address={user.address}>
              <div className="relative flex h-[100px] w-[100px] select-none items-center justify-center rounded-full border-2 border-fuchsia-600 p-[2px]">
                <div
                  className="absolute z-10 h-[100px] w-[100px] cursor-pointer rounded-full duration-200 ease-in-out hover:bg-black/40"
                  onMouseEnter={() => setHoverAvatar(true)}
                  onMouseLeave={() => setHoverAvatar(false)}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <MdOutlineModeEdit className={cn("text-2xl text-white", hoverAvatar ? "block" : "hidden")} />
                  </div>
                </div>

                {loadingAvatar ? (
                  <Skeleton className="h-[92px] w-[92px] rounded-full bg-gray-300 dark:bg-zinc-700" />
                ) : (
                  (avatar && (
                    <div className="relative z-0 h-[92px] w-[92px]">
                      <Image
                        src={avatar}
                        fill
                        alt="Avatar"
                        style={{ objectFit: "cover" }}
                        className="absolute rounded-full bg-background"
                        loading="lazy"
                      />
                    </div>
                  )) || <BoringAvatar size={95} name={user.address} />
                )}
              </div>
            </EditModeAvatarDialog>
            <div className="flex gap-2">
              <ShareProfileDialog user={user} copyLink={copyLink} setCopyLink={setCopyLink} variant="ghost" size="sm" />
              {/* <Button className="p-2" size="sm" variant="outline">
                Upload Cover
              </Button> */}
            </div>
          </div>

          <div className="w-full">
            <div className="my-2 flex items-center gap-1 text-2xl font-bold">
              <h1 className="truncate text-start">{(user.session.name && truncate(user.session.name, 20)) || shortenAddress(user.address)}</h1>
              <MdVerified className={cn(isVerified ? "text-blue-500" : "text-gray-400 dark:text-gray-400")} />
            </div>

            <AddressClipboard address={user.address} content="Copy Address" />
          </div>
        </div>
      </div>

      {/* Banner on desktop screen */}
      <div className="absolute hidden h-[300px] w-full px-7 py-6 md:block">
        <div className="mb-4 flex w-full justify-between">
          <div className="flex items-center gap-3">
            <EditModeAvatarDialog address={user.address}>
              <div className="relative flex h-[125px] w-[125px] select-none items-center justify-center rounded-full border-2 border-fuchsia-600 p-1">
                <div
                  className="absolute z-10 h-[115px] w-[115px] cursor-pointer rounded-full duration-200 ease-in-out hover:bg-black/40"
                  onMouseEnter={() => setHoverAvatar(true)}
                  onMouseLeave={() => setHoverAvatar(false)}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <MdOutlineModeEdit className={cn("text-2xl text-white", hoverAvatar ? "block" : "hidden")} />
                  </div>
                </div>

                {loadingAvatar ? (
                  <Skeleton className="h-[115px] w-[115px] rounded-full bg-gray-300 dark:bg-zinc-700" />
                ) : (
                  (avatar && (
                    <div className="relative z-0 h-[115px] w-[115px]">
                      <Image
                        src={avatar}
                        fill
                        alt="Avatar"
                        style={{ objectFit: "cover" }}
                        className="absolute rounded-full bg-background"
                        loading="lazy"
                      />
                    </div>
                  )) || <BoringAvatar size={115} name={user.address} />
                )}
              </div>
            </EditModeAvatarDialog>

            <div className={cn(open_sans.className, "flex max-w-[400px] flex-col gap-2 md:max-w-[400px] lg:max-w-[540px] xl:max-w-[640px]")}>
              <div className="flex w-full items-center gap-1 text-4xl font-bold">
                <div className="truncate rounded-md bg-black px-4 py-2">
                  <h2 className="truncate text-zinc-100">{user.session.name || user.address}</h2>
                </div>
                <TooltipMsg message={isVerified ? "Verified" : "Not Verified"} delay={250}>
                  <div className="cursor-pointer rounded-sm p-1 hover:bg-slate-500/30">
                    {!loadingVerified && <MdVerified className={cn(isVerified ? "text-blue-500" : "text-gray-400 dark:text-gray-400")} />}
                  </div>
                </TooltipMsg>
              </div>
              <div>
                <AddressClipboard address={user.address} content="Copy Address" />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <ShareProfileDialog user={user} copyLink={copyLink} setCopyLink={setCopyLink} />

            {/* <Button className="hidden gap-2 p-2 md:flex" variant="outline">
              <FiEdit3 className="text-xl lg:hidden" />
              <span className="hidden lg:block">Upload Cover</span>
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
