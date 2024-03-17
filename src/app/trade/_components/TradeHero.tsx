"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function TradeHero() {
    return (
        <>
            <div className='flex justify-center gap-8 mb-16'>
                {/* Left-side */}
                <section className='flex flex-col w-[500px] gap-4'>
                    {/* Hero Text */}
                    <div>
                        <h1 className='text-[2rem] font-bold'>Trade Rare</h1>
                        <h1 className='text-[2rem] font-bold'>Collection of NFTs</h1>
                    </div>

                    <p>Embark on a journey through our exclusive NFT collection, where rare and exceptional digital assets await discovery and ownership.</p>

                    {/* Buy & Sell Buttons */}
                    <section className='flex gap-6'>
                        <Link href='#' className='text-white text-center rounded-lg w-24 py-2 bg-purple-700 hover:bg-purple-600 active:bg-purple-800'>Buy</Link>
                        <Link href='#' className='text-white text-center rounded-lg w-24 py-2 bg-purple-700 hover:bg-purple-600 active:bg-purple-800'>Sell</Link>
                    </section>

                    {/* Statistics */}
                    <section className='flex gap-8 mt-6'>
                        <div className="flex flex-col">
                            <h1 className='text-2xl font-bold'>P388M</h1>
                            <p>Trading Volume</p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className='text-2xl font-bold'>106K</h1>
                            <p>NFT Creators</p>
                        </div>
                        <div className="flex flex-col">
                            <h1 className='text-2xl font-bold'>2.4M</h1>
                            <p>Total Users</p>
                        </div>
                    </section>
                </section>

                {/* Right-side */}
                <section className='flex flex-col w-[500px]'>
                    {/* Join */}
                    <section className='flex mb-8'>
                        <Image src="/assets/JarsLogo.png" width={100} height={100} alt="Jars Logo" />
                        <div>
                            <p className='font-bold'>Join Our NFT Community.</p>
                            <p>Uniting creators, collectors; redefining digital ownership with innovation.</p>
                            <Link href="#" className='underline hover:text-purple-700 active:text-purple-800 w-fit'>Join Now</Link>
                        </div>
                    </section>

                    {/* Images */}
                    <div className='relative h-72 w-96 left-16'>
                        <Image className='absolute top-1/2 left-1/2 translate-x-[-30%] translate-y-[-32%] z-10' src="/assets/ex1.png" width={200} height={300} alt="unggoy" />
                        <Image className='absolute top-1/4 left-1/4 translate-x-[-30%] translate-y-[-32%]' src="/assets/ex2.png" width={200} height={300} alt="babae" />
                    </div>
                </section>
            </div>
        </>
    )
}