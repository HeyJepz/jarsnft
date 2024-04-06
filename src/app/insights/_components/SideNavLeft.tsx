"use client";

import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { leftNavList } from "../_metadata";
import { leftNewList } from "../_metadata";

export default function SideNavLeft() {
  const path = usePathname();

  return (
    <aside className='fixed pt-9 z-30 -ml-3 hidden border-r border-gray-300 h-[calc(100vh-3.5rem)] right-auto w-[16.5rem] shrink-0 md:sticky md:block overflow-y-scroll scrollbar-hide'>
      <div className={cn(poppins.className)}>
            {leftNewList.map(item => (
            <div className="mb-4 text-sm" key={item.topic}>      
              <h1 className="font-semibold">{item.topic}</h1>
              <ul className='flex flex-col mt-4 border-l border-[#252525]' key={item.topic}>
                {item.child.map(child => (
                  <li key={child.name} className={cn("mb-3 font-semibold text-white block border-l pl-4 -ml-px border-transparent ", path === child.href && " text-[#A519D7] border-l-[#A519D7]  font-bold",
                  path !== child.href && "hover:border-slate-400 dark:hover:border-slate-500 dark:text-[#858685] dark:hover:text-slate-300")}>
                    <Link href={child.href}>{Capitalize(child.name)}</Link>
                  </li>     
                ))}
              </ul>
            </div>
            ))}
      </div>
    </aside>
  );
}

const Capitalize = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};