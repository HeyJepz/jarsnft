import { Footer, Navbar } from "@/components/(layout)";
import { appConfig } from "@/lib/app.config";
import { title } from "process";
import React from "react";

export const metadata = {
  title: "Collections | JarsNFT",
  description: "Collections of NFTs",
  keywords: appConfig.keywords,
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="py-auto mx-auto max-w-screen-2xl overflow-hidden px-2">
        <main className="p-2">{children}</main>
        <Footer />
      </div>
    </>
  );
}
