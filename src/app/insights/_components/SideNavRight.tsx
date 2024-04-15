"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { rightNavList } from "../_metadata";

export default function SideNavRight() {
  const path = usePathname();
  const [item] = rightNavList.filter((item) => item.href === path);
  console.log(item.href);
  return (
    <div className="hidden text-sm xl:block">
      <div className="sticky top-16 -mt-4 pt-5">
        <div className="relative overflow-hidden pb-10">
          <h1 className="font-semibold">On This Page</h1>
          <div className="mt-4 h-full w-full rounded-[inherit]">
            {item.anchors.map((val) => (
              <div key={val.anchor} className="border-l-3 px-3 py-2">
                <Link href={`${item.href}/${val.anchor}`}>{val.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
