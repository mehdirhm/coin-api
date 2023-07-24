import ChangeThemeButton from "../ChangeThemeButton/ChangeThemeButton";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";

interface Props {
  color: string;
  backColor: string;
}
const Header = ({ color, backColor = "#ffffff" }: Props) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? backColor : "#282727",
      }}
      className={`flex shadow-lg flex-row w-[100vw] bg-[#282727] h-[50px]`}
    >
      <ChangeThemeButton
        onClick={toggleTheme}
        className="h-[40px] mt-1"
        color={theme === "light" ? "#33007a" : color}
      />
      <Link to="/">
        <button
          style={{
            color: theme === "light" ? "#33007a" : color,
          }}
          className="absolute text-[14px] left-4 top-3 "
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Header;
