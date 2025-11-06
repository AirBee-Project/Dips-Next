import { createContext, useContext, useState, type ReactNode } from "react";
import { MainFeatureList, type Feature } from "../data/Feature";

type MenuContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  features: Record<string, Feature>;
  setFeatures: React.Dispatch<React.SetStateAction<Record<string, Feature>>>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [features, setFeatures] = useState(MainFeatureList);

  return (
    <MenuContext.Provider
      value={{ isMenuOpen, setIsMenuOpen, features, setFeatures }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within a MenuProvider");
  return context;
};
