import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import init, { process_calculation } from "../pkg/calc_wasm";
import type { SpaceTimeID } from "./SpaceTimeID";

export type Calculation =
  | { type: "AND"; value1: Calculation[]; value2: Calculation[] }
  | { type: "OR"; value1: Calculation[]; value2: Calculation[] }
  | { type: "IDs"; value: SpaceTimeID[] };

interface KasaneContextType {
  processCalculation: (calc: Calculation) => any | null;
  isReady: boolean;
}

const KasaneContext = createContext<KasaneContextType>({
  processCalculation: () => null,
  isReady: false,
});

export const KasaneProvider = ({ children }: { children: ReactNode }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    init().then(() => setReady(true));
  }, []);

  const handleProcess = (calc: Calculation) => {
    if (!ready) return null;
    return process_calculation(calc as any);
  };

  return (
    <KasaneContext.Provider
      value={{ processCalculation: handleProcess, isReady: ready }}
    >
      {children}
    </KasaneContext.Provider>
  );
};

export const useKasane = () => useContext(KasaneContext);
