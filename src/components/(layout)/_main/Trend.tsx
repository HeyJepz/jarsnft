
import { CollectionData } from "@/types";
import NFTCarousel from "./NFTCarousel";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

export default function Trend({
  category,
  collections,
  link,
}: {
  category: string;
  collections: CollectionData[];
  link: string;
}) {
  return (
    <div className="my-12">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm lg:text-4xl font-bold">Trending in {category}</p>
        <RainbowButton>
          <Link href={link}>View {category}</Link>
        </RainbowButton>
      </div>
      <div className="my-12 px-0 md:px-10">
        <NFTCarousel collections={collections} />
      </div>
    </div>
  );
}
