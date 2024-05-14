"use client";

import {
  SideNavLeft,
  SideNavRight,
  LearnNavbar,
  PageNavbarTitle,
  PageNextButton,
} from "./_components";
import { Footer } from "@/components/(layout)";
import { leftNavList } from "./_metadata";
import { usePathname } from "next/navigation";
import { PageNavTopic } from "./_components/PageNavbar";

type LearnProps = {
  children: React.ReactNode;
};

export default function LearnLayout({ children }: LearnProps) {
  // try to make pagenextbutton dynamic - get data from index and display the next item after current item on the button
  const path = usePathname();
  const nextBtn = leftNavList.map((item, index) => (
    <div key={index}>
      {item.child.map((childItem, childIndex) =>
        // check for child sub topic
        path === childItem.href && childIndex < item.child.length - 1 ? (
          <PageNextButton
            key={childIndex}
            title={Capitalize(item.child[childIndex + 1].name)}
            href={item.child[childIndex + 1].href}
          />
        ) : (
          // check on next topic
          path === childItem.href &&
          index < leftNavList.length - 1 && (
            <PageNextButton
              key={childIndex}
              title={Capitalize(
                leftNavList[(index + 1) % leftNavList.length].child[0].name,
              )}
              href={leftNavList[(index + 1) % leftNavList.length].child[0].href}
            />
          )
        ),
      )}
    </div>
  ));
  // bg-[#f2f4f5]
  return (
    <main className="flex-1 ">
      <LearnNavbar />
      <div className="flex-1 items-start border-t-2 lg:container lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-10">
        <SideNavLeft />
        <main className="relative ml-5 mr-5 mt-5 lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="min-w-full">
            <PageNavbarTitle />
            <div className="md:container md:my-5">
              <PageNavTopic color="#A519D7" />
              {children}
              {nextBtn}
            </div>
          </div>
          <SideNavRight />
        </main>
      </div>
      <Footer />
    </main>
  );
}

const Capitalize = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};
