import { FC } from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface ButtonProps {
  children?: string;
  title: string;
  price: number;
  img: string;
}

const Button: FC<ButtonProps> = ({ title, price, img }): JSX.Element => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        border: theme === "light" ? "1px solid #31008b" : "1px solid #ffffff",
      }}
      className="flex  px-3 py-1 rounded-[5px] flex-row gap-1 text-[#ffffff]"
    >
      <div
        style={{
          direction: "ltr",
          color: theme === "light" ? "#31008b" : "#ffffff",
        }}
        className="flex flex-col"
      >
        <span>${price}</span>
        <span>{title}</span>
      </div>
      <div>
        <img width="50px" height="50x" src={img} alt="" />
      </div>
    </div>
  );
};

export default Button;
