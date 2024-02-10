import { Navbar, Footer } from '@/components/(layout)'
import React from 'react'
import { ArtTrend, BuySellNFT, NFTCategories, PhotoTrend, TradeHero } from '.'

const Trade = () => {
    return (
        <>
            <Navbar display={"sticky"} />
            <TradeHero />
            <BuySellNFT />
            <ArtTrend />
            <PhotoTrend />
            <NFTCategories />
            <Footer />
        </>
    )
}

export default Trade