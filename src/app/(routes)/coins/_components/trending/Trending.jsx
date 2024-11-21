import React from "react";
import flame from "/public/flame.svg";
import rocket from "/public/rocket.svg";
import dollar from "/public/dollar.svg";
import { TrendingCard, FearAndGreedCard } from ".";
import { getCoingeckoGlobalData } from "../../api/apiCoingecko";
import { roundTwoDecimalPlaces } from "../../api/currencyFunctions";
import { TbCaretUpFilled } from "react-icons/tb";
import { TbCaretDownFilled } from "react-icons/tb";

const Trending = async () => {
  try {
    const data = await getCoingeckoGlobalData();
    const percentChange = data.data.market_cap_change_percentage_24h_usd;
    const usdCap = (data.data.total_market_cap.usd / 1e12).toFixed(3);
    const icon = percentChange < 0 ? <TbCaretDownFilled /> : <TbCaretUpFilled />;
    const result = percentChange < 0 ? "decrease" : "increase";
    const resultColor = percentChange < 0 ? "dark:#DC143C" : "dark:#2eff00";

    return (
      <>
        <div className="mb-6 mt-10 flex flex-1 flex-col gap-4">
          <h1 className="text-xl font-bold lg:text-4xl">Todays Cryptocurrency Prices by Market Cap</h1>
          <h2 className="text-md flex items-center gap-1 font-semibold lg:text-3xl">
            {`The Global Crypto Market Cap is ${usdCap}T,`} <span className={resultcolor}>{icon}</span>
            <span style={{ color: resultColor }}>{`a ${roundTwoDecimalPlaces(percentChange)}% ${result}`}</span> over the last day.
          </h2>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <TrendingCard title="Trending Coins (24h)" icon={flame} type="coins" />
          <TrendingCard title="Top NFTs (24h)" icon={rocket} type="nfts" />
          <FearAndGreedCard title="Fear and Greed Index" icon={dollar} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching global data:", error);
    return <div>Error fetching data</div>;
  }
};

export default Trending;
