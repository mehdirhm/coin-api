import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import { useTheme } from "../../contexts/ThemeContext";

import { Link } from "react-router-dom";

interface Coin {
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  description: {
    en: string;
  };
  market_data: {
    market_cap: {
      usd: number;
    };
    current_price: {
      usd: number;
    };
  };
  market_cap_rank: number;

  // Define the properties of the Coin interface here
  // Similar to what you had before
}

const CoinDetails: React.FC = () => {
  const { coinId } = useParams<{ coinId: string }>(); // با استفاده از match.params اطلاعات کوین موردنظر را دریافت می‌کنیم
  const [coinDetails, setCoinDetails] = useState<Coin | null>(null);
  const { theme } = useTheme();
  useEffect(() => {
    // Get the coinId from the URL

    if (coinId) {
      // Make a request to fetch the details of the specific coin using its coinId
      const fetchCoinDetails = async () => {
        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinId}`
          );
          setCoinDetails(response.data);
        } catch (error) {
          console.error("Error fetching coin details:", error);
        }
      };

      fetchCoinDetails();
    }
  }, [coinId]);

  if (!coinDetails) {
    return (
      <div
        style={{
          backgroundColor: theme === "light" ? "#e3c1fef4" : "#282727",
        }}
        className="flex justify-center h-[100vh] w-[100vw]"
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-[100vh]"
      style={{
        backgroundColor: theme === "light" ? "#e3c1fef4" : "#282727",
      }}
    >
      <Header backColor="#e3c1fef4" color="#d7af00" />
      <div className="mt-[30px] ">
        <div className="flex w-[100vw] flex-col justify-between h-[70vh]">
          <div className="flex justify-center">
            <img src={coinDetails?.image.large} alt="" />
          </div>
          <div className="flex justify-center">
            <h1
              style={{
                color: theme === "light" ? "#3c0781e8" : "#ffffff",
              }}
              className="text-[50px] text-[#ffffff] font-bold"
            >
              {coinDetails?.name}
            </h1>
          </div>
          <div
            style={{
              direction: "ltr",
            }}
            className="flex flex-row justify-center w-[100vw] p-4"
          >
            <p
              style={{
                color: theme === "light" ? "#3c0781e8" : "#ffffff",
              }}
              className="text-[17px]"
            >
              {coinDetails?.description?.en?.slice(0, 950) + "..."}
            </p>
          </div>
          <div
            style={{
              direction: "ltr",
            }}
            className="flex justify-around p-4 flex-row mr-[20px]"
          >
            <div className="flex rounded-md flex-col justify-center gap-5 w-[300px] h-[150px] bg-[#ffc21b] items-center">
              <h1
                style={{
                  color: theme === "light" ? "#3c0781e8" : "#ffffff",
                }}
                className="text-[#ffffff] text-[30px]"
              >
                Market Cap
              </h1>
              <span
                style={{
                  color: theme === "light" ? "#3c0781e8" : "#ffffff",
                }}
                className="text-[18px]"
              >
                ${coinDetails.market_data?.market_cap?.usd}
              </span>
            </div>

            <div className="flex gap-5 rounded-md w-[200px] h-[150px] bg-[#ffc21b] flex-col justify-center items-center">
              <h1
                style={{
                  color: theme === "light" ? "#3c0781e8" : "#ffffff",
                }}
                className="text-[#ffffff] text-[30px]"
              >
                Price
              </h1>
              <span
                style={{
                  color: theme === "light" ? "#3c0781e8" : "#ffffff",
                }}
                className="text-[18px]"
              >
                ${coinDetails.market_data?.current_price?.usd}
              </span>
            </div>

            <div
              style={{
                color: theme === "light" ? "#3c0781e8" : "#ffffff",
              }}
              className="flex w-[200px] gap-5  rounded-md bg-[#ffc21b] h-[150px] flex-col justify-center items-center"
            >
              <h1
                style={{
                  color: theme === "light" ? "#3c0781e8" : "#ffffff",
                }}
                className="text-[#ffffff] text-[30px]"
              >
                Rank
              </h1>
              <span className="text-[18px]">
                {coinDetails?.market_cap_rank}
              </span>
            </div>
          </div>
          <div className="flex flex-row w-[100vw]  justify-between p-2  relative mt-[150px] bottom-4">
            <Link to="/">
              <button className="bg-[#ffb812fa] font-bold flex text-[#fefefe] h-[50px] items-center shadow-lg justify-center rounded w-[150px]">
                Home Page
              </button>
            </Link>

            <Link to="/search">
              <button className="bg-[#ffb812fa] font-bold flex text-[#fefefe] h-[50px] items-center shadow-lg justify-center rounded w-[150px]">
                Search Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
