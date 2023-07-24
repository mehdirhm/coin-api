import React, { createContext, useContext, useState } from "react";

// Define the type for the theme context value
type ThemeContextValue = {
  theme: string;
  toggleTheme: () => void;
};

// Create the initial context with default values
const initialThemeContext: ThemeContextValue = {
  theme: "light",
  toggleTheme: () => {},
};

// Create the theme context
const ThemeContext = createContext<ThemeContextValue>(initialThemeContext);

// Define the type for the props of the ThemeContextProvider component
type ThemeContextProviderProps = {
  children: React.ReactNode;
};

// Create the ThemeContextProvider component
const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeContextValue: ThemeContextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook for using the theme context
export const useTheme = () => useContext(ThemeContext);

export default ThemeContextProvider;
