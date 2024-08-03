"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

export default function DropdownControls({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const router = useRouter();
  const collectionCategory = (searchParams["category"] as string) ?? "all";

  const categoryNames = ["all", "art", "photography", "pfp"];
  let categoryFullName = "";

  if (!categoryNames.includes(collectionCategory)) {
    console.error("category does not exists");
  }

  if (collectionCategory === "all") {
    categoryFullName = "All Collections";
  } else if (collectionCategory === "art") {
    categoryFullName = "Art NFTs";
  } else if (collectionCategory === "photography") {
    categoryFullName = "Photography NFTs";
  } else if (collectionCategory === "pfp") {
    categoryFullName = "Profile Picture NFTs";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-12 w-52 items-center justify-center gap-2 rounded-lg bg-background">
        {categoryFullName}
        <IoIosArrowDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push(`?category=all&page=1`)}>All Collections</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`?category=art&page=1`)}>Art NFTs</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`?category=photography&page=1`)}>Photography NFTs</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`?category=pfp&page=1`)}>Profile Picture NFTs</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
