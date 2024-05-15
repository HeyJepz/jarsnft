"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdHome, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { leftNavList } from "../_metadata";
import { cn } from "@nextui-org/react";
import SideBarHamburger from "./SideBarHamburger";

export default function PageNavbar() {
  return (
    <div className="sticky top-[3.4rem] z-40 mx-3 flex w-full items-center gap-5 border-b border-[#4232417c] bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
      <div className="mx-3 flex items-center gap-5">
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/insights">
            <MdHome className="text-xl opacity-[.40]" />
          </Link>
          <MdOutlineKeyboardArrowRight className="text-xl opacity-[.40]" />
          <PageNavTopic color="#696c72" />
          <MdOutlineKeyboardArrowRight className="text-xl opacity-[.40]" />
          <PageNavCurrent />
        </div>
      </div>
    </div>
  );
}

export function PageNavCurrent() {
  const path = usePathname();
  const getTitle = leftNavList.map((item) =>
    item.child.map(
      (childItem, index) =>
        path === childItem.href && (
          <h2 key={index} className="font-bold text-[#A519D7]">
            {childItem.name.replace(/\b\w/g, (char) => char.toUpperCase())}
          </h2>
        ),
    ),
  );
  return getTitle;
}

export function PageNavTopic(props: any) {
  const path = usePathname();
  const getTitle = leftNavList.map((item, index) =>
    item.child.map(
      (childItem, index) =>
        path === childItem.href && (
          <h2
            key={index}
            className={cn(`text-lg font-bold text-[${props.color}]`)}
          >
            {item.topic.replace(/\b\w/g, (char) => char.toUpperCase())}
          </h2>
        ),
    ),
  );
  return getTitle;
}
