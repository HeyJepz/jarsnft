import { NFTContentWrapper } from "@/components/(interfaces)";
import { Suspense } from "react";
import { NFTContentSkeleton } from "../(skeletons)";

export default async function PopularCollections() {
  return (
    <section className="container mt-12">
      <div className="mx-auto md:w-[768px] lg:w-[1280px] xl:w-[1456px] 2xl:w-[1456px]">
        <Suspense fallback={<NFTContentSkeleton />}>
          <NFTContentWrapper title="Popular Collection" />
        </Suspense>
      </div>
    </section>
  );
}
