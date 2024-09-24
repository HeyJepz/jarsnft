import { jars } from "@/lib/core/api";
import * as getCollections from "@/utils/getCollections";
import Image from "next/image";
import Link from "next/link";
import PaginationControls from "./PaginationControls";
import { CollectionData } from "@/utils/getCollections";

export default async function Collections({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } } ) {
  const page = searchParams["page"] ?? 1;
  const limit = 5;

  const start = (Number(page) - 1) * limit;
  const end = start + limit;

  const selectedCategory = (searchParams["category"] as string) ?? "all";
  let currentCollections = await jars.getNFTCollections();

  if (selectedCategory === "all") {
    currentCollections = await jars.getNFTCollections();
  } else if (selectedCategory === "art") {
    currentCollections = await getCollections.getArtCollections();
  } else if (selectedCategory === "photography") {
    currentCollections = await getCollections.getPhotosCollections();
  } else if (selectedCategory === "pfp") {
    currentCollections = await getCollections.getPFPsCollections();
  }

  const slicedCollections = currentCollections.slice(start, end);
  const hide= () => {
    return 'hidden lg:inline-block'
  }
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 lg:grid-cols-9 place-items-center py-4 space-x-4">
        <div>Name</div>
        <div>Floor Price</div>
        <div className={hide()}>Floor Change</div>
        <div className={hide()}>Volume</div>
        <div className={hide()}>Volume Change</div>
        <div className={hide()}>Sales</div>
        <div className={hide()}>Sales Change</div>
        <div>Listed</div>
        <div className={hide()}>Verified</div>
      </div>

      {slicedCollections.map((collection, i) => (
        <Link
          href={`/collection/${collection.contract}`}
          className="grid grid-cols-3 lg:grid-cols-9 lg:pl-5 place-items-center transition-background hover:bg-accent-foreground/15 rounded-lg space-x-6 gap-4"
          key={i}
        >
          <div className="flex items-center gap-1 justify-self-start py-4">
            <Image
              src={collection.image}
              width={50}
              height={50}
              style={{ minHeight: "60px", minWidth: "60px", objectFit: "cover", objectPosition: "center" }}
              alt="logo of a collection"
              className="size-14 rounded-lg"
            />
            <p className="max-w-[6rem] h-fit truncate">{collection.name}</p>
            
          </div>
          <div>{collection.seller_fee_basis_points}</div> {/* Floor Price */}
          <div className={hide()}>{collection.seller_fee_basis_points}</div> {/* Floor Change */}
          <div className={hide()}>{collection.seller_fee_basis_points}</div> {/* Volume */}
          <div className={hide()}>{collection.seller_fee_basis_points}</div> {/* Volume Change */}
          <div className={hide()}>{collection.seller_fee_basis_points}</div> {/* Sales */}
          <div className={hide()}>{collection.seller_fee_basis_points}</div> {/* Sales Change */}
          <div >{collection.seller_fee_basis_points}</div> {/* Listed */}
          <div className={hide()}>{true && <Image src="/assets/verify.png" width={20} height={20} alt="verified logo" className="h-fit"/>}</div> {/* Verified */}
        </Link>
      ))}
      <PaginationControls
        searchParams={searchParams}
        className="pt-4"
        hasPrevPage={start > 0}
        hasNextPage={end < currentCollections.length}
        collectionLength={currentCollections.length}
      />
    </div>
  );
}
