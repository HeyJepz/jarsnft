"use client"

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { FaFacebookF, FaDiscord, FaTwitter, FaInstagram } from 'react-icons/fa'
import { Moon, Sun } from "lucide-react"
import { IconType } from 'react-icons';

export default function Footer() {
  return (
    <footer className=''> {/* pt-32 px-20 pb-10 */}
      <section className=''> {/* max-w-screen-xl mx-auto */}
        <div className='pt-32 px-20 pb-10 grid grid-cols-3 gap-x-5 gap-y-10 mb-14'>
          <div className='flex flex-col gap-y-5'>
            <h1 className='font-semibold mb-1'>Resource</h1>
            <Link href='/' className='hover:underline'>News & Guides</Link>
            <Link href='/' className='hover:underline'>Getting Started</Link>
            <Link href='/' className='hover:underline'>Community standards</Link>
            <Link href='/' className='hover:underline'>Fees</Link>
          </div>
          <div className='flex flex-col gap-y-5'>
            <h1 className='font-semibold mb-1'>Marketplace</h1>
            <Link href='/category/art' className='hover:underline'>Art</Link>
            <Link href='/category/photography' className='hover:underline'>Photography</Link>
            <Link href='/category/pfps' className='hover:underline'>PFPs</Link>
          </div>
          <div className='flex flex-col gap-y-5'>
            <h1 className='font-semibold mb-1'>Help</h1>
            <Link href='/learn' className='hover:underline'>What is NFT?</Link>
            <Link href='/learn' className='hover:underline'>How to buy an NFT</Link>
            <Link href='/learn' className='hover:underline'>How to sell an NFT</Link>
            <Link href='/learn' className='hover:underline'>What are blockchain gas fees?</Link>
            <Link href='/learn' className='hover:underline'>What is a blockchain?</Link>
          </div>
        </div>

        <div className='px-20'>
          <h1 className='text-2xl font-semibold mb-3'>Join us</h1>
          <div className="flex justify-between">
            <div className='flex gap-2'>
              <SocialLinkButton Icon={FaFacebookF} link='' />
              <SocialLinkButton Icon={FaDiscord} link='' />
              <SocialLinkButton Icon={FaTwitter} link='' />
              <SocialLinkButton Icon={FaInstagram} link='' />
            </div>
            <div>
              <ModeToggle />
            </div>
          </div>
        </div>

        <div className="copyright w-full p-8 mt-10 text-white flex flex-col items-center bg-gray-900">
          <h1 className='font-extrabold text-2xl'>JarsNFT</h1>
          <p className='text-xs text-gray-600'>Copyright © 2024 JarsNFT</p>
        </div>
      </section>
    </footer>
  )
}

function SocialLinkButton({ Icon, link }: { Icon: IconType, link: string }) {
  return (
    <Link href={link}>
      <div className='w-[50px] h-[50px] bg-[#d9d9d9] dark:bg-slate-900 dark:text-gray-500 text-2xl rounded-[10px] flex items-center justify-center'>
        <Icon />
      </div>
    </Link>
  )
}

function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className='w-[50px] h-[50px] bg-[#d9d9d9] dark:text-[#444444] text-2xl rounded-[10px]  cursor-pointer'>
      {theme === "dark" ? (
        <div className='w-full h-full flex items-center justify-center' onClick={() => setTheme("light")}>
          <Moon className='h-6 w-6' />
        </div>

      ) : (
        <div className='w-full h-full flex items-center justify-center' onClick={() => setTheme("dark")}>
          <Sun className='h-6 w-6' />
        </div>
      )}
    </div>
  )
}