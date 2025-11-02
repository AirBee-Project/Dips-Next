import { createContext, useContext, useState, type ReactNode } from "react";

type MenuContextType = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  setMenuOpen: (value: boolean) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const setMenuOpen = (value: boolean) => setIsMenuOpen(value);

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
