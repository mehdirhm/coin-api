import { FC, useEffect, useState } from "react";
import styles from "../../Styles/Home.module.css";
import Button from "../Button/Button";
import { v4 as uuidv4 } from "uuid";

import { Link } from "react-router-dom";
import ChangeThemeButton from "../ChangeThemeButton/ChangeThemeButton";
import { useTheme } from "../../contexts/ThemeContext";

const Home: FC = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  let savedResults = localStorage;
  const dataArray = Object.values(savedResults).map(
    (value) => JSON.parse(value)[0].data[0]
  );

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#e3c1fef4" : "#0f002b",
      }}
      className="flex px-24 h-[100vh] w-[100vw] bg-[#0f002b]"
    >
      <ChangeThemeButton
        className="mt-3"
        onClick={toggleTheme}
        color={theme === "light" ? "#31008b" : "#ffffff"}
      />
      <div className="flex flex-row justify-between w-[100%] items-center">
        <div className={styles.imgHeader}></div>
        <div
          className="flex flex-col items-center gap-11"
          style={{
            direction: "ltr",
          }}
        >
          <div className="flex items-center flex-col gap-8">
            <h1
              style={{
                color: theme === "light" ? "#31008b" : "#ffffff",
              }}
              className=" text-[70px]"
            >
              Search &
            </h1>
            <h1
              style={{
                color: theme === "light" ? "#31008b" : "#ffffff",
              }}
              className="text-[70px]"
            >
              Buy <span className="text-[#d7af00]">Crypto</span>
            </h1>
          </div>
          <div
            style={{
              color: theme === "light" ? "#31008b" : "#ffffff",
            }}
            className="flex flex-col items-center"
          >
            <span>Mohaymen ICT</span>
            <span>Test Project</span>
          </div>

          <div>
            <Link
              style={{
                color: theme === "light" ? "#31008b" : "#ffffff",
              }}
              className="w-[132px] hover:text-[#ffffff] decoration-white text-[#ffffff] cursor-pointer flex justify-center items-center font-medium text-[14px] p-[9px] rounded-full bg-[#f6ba00]"
              to="/search"
            >
              SEARCH MORE
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-36 absolute bottom-4 right-28">
        {dataArray?.map((coin) => (
          <Button
            key={uuidv4()}
            title={coin?.name}
            price={coin?.current_price}
            img={coin?.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
