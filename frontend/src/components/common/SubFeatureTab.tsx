import { useEffect, useState, type ReactNode } from "react";
import { useMenu } from "../../context/Menu";

type Props = {
  children: ReactNode;
  mainFeature: string;
  subFeature: string;
};

type AnimationState = {
  transform: string;
  opacity: string;
};
/**
 * FeatureとSubFeatureを指定すると、Contextの状態を監視してアニメーションを実行してくれる。
 */
export default function SubFeatureTab({
  children,
  mainFeature,
  subFeature,
}: Props) {
  const { features } = useMenu();
  const [style, setStyle] = useState<AnimationState>({
    transform: "translateX(-20px)",
    opacity: "0",
  });
  const isOpen =
    features[mainFeature]?.subFeatures?.[subFeature]?.isOpen ?? false;
  useEffect(() => {
    if (isOpen) {
      setStyle({
        transform: "translateX(-20px)", opacity: "0"
      });
      requestAnimationFrame(() => setStyle({ transform: "translateX(0px)", opacity: "1" }));
    } else {
      setStyle({ transform: "translateX(-20px)", opacity: "0" });
    }
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <div className="overflow-hidden transition-all duration-250 ease-in-out" style={style}>
          {children}
        </div>
      )}
    </div>
  );
}
