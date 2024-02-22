"use client"

import Image from "next/image"
import Link from 'next/link'
import {
  ConnectWallet,
  useLogin,
  useContract,
  useLogout,
  useUser,
  useAddress,
  useAuth
} from "@thirdweb-dev/react"
import { useTheme } from 'next-themes'
import { AuthLoginButton, ConnectWeb3, LoginButton } from '../(interfaces)'
import { Button } from '../ui/button'

type DisplayType = "fixed" | "sticky";
interface NavbarProps {
  display: DisplayType;
}

export default function Navbar({ display }: NavbarProps) {

  return (
    <nav className={`${display} w-full h-[70px] px-[1.2rem] py-[0.8rem] flex justify-between z-50 top-0 left-0 
      bg-white dark:bg-opacity-100 dark:bg-background border-b-2`}>
      <div className="flex flex-row justify-between items-center w-full max-w-screen-2xl mx-auto">

        {/* Left-side  */}
        <div className='flex items-center'>

          <div className=''>
            <Link href='/'>
              <h1 className='font-extrabold text-2xl'>Jarsnft</h1>
            </Link>
          </div>

          <div className='hidden lg:flex ml-36 gap-1 xl:mr-5'>
            <Link href='/create' className='px-3 font-semibold hover:text-zinc-500 cursor-pointer'>Create</Link>
            <Link href="/collection" className='px-3 font-semibold hover:text-zinc-500 cursor-pointer'>Collections</Link>
            <Link href="/trade" className='px-3 font-semibold hover:text-zinc-500 cursor-pointer'>Trade</Link>
            <Link href="/coin" className='px-3 font-semibold hover:text-zinc-500 cursor-pointer'>Coin Analytics</Link>
            <Link href='/insights' className='px-3 font-semibold hover:text-zinc-500 cursor-pointer'>Insights</Link>
            <Link href="/learn" className='px-3 font-semibold hover:text-zinc-500 cursor-pointer'>Learn</Link>
          </div>
        </div>

        <div>
          {/* <LoginButton /> */}
          {/* <AuthLoginButton /> */}
          <ConnectWeb3 />
        </div>

      </div>
    </nav>
  )
}