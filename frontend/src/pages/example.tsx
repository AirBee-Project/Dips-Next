import { useKasane } from "../context/Kasane";

export default function App() {
  const { processCalculation, isReady } = useKasane();

  if (!isReady) return <div>WASM initializing...</div>;

  // 複雑なネスト例
  const complexRange = {
    type: "AND",
    value1: {
      type: "IDs",
      value: [
        { z: 4, f: 0, x: 3, y: 4 },
        { z: 4, f: 0, x: 4, y: 4 },
        { z: 4, f: 0, x: 5, y: 4 },
      ],
    },
    value2: {
      type: "IDs",
      value: [{ z: 2, f: 0, x: 1, y: 1 }],
    },
  };

  // WASM 関数呼び出し
  const result = processCalculation(complexRange as any);

  return (
    <div>
      <h1>Kasane Complex Calculation</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
