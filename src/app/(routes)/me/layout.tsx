import { Footer, Navbar } from "@/components/(layout)";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Profile | JarsNFT",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <Navbar />
      <main className="md:container">{children}</main>
      <Footer />
    </main>
  );
}
