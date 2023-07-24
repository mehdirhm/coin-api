import { FC } from "react";
interface ModeProps {
  color: string;
  className?: string;
  onClick?: () => void;
}
const ChangeThemeButton: FC<ModeProps> = ({
  color,
  className,
  onClick,
}): JSX.Element => {
  return (

    <div
      onClick={onClick}
      style={{
        color: color,
        borderColor: color,
      }}
      className={`w-[150px]  right-3 absolute  h-[40px] cursor-pointer flex justify-center items-center font-bold text-[14px] p-[9px] pt-[10px] rounded-full border ${className}`}
    >
      Change Theme
    </div>
  );
};
export default ChangeThemeButton;
