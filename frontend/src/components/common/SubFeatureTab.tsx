import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "../../context/Menu";

type Props = {
  children: ReactNode;
  mainFeature: string;
  subFeature: string;
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

  const isOpen =
    features[mainFeature]?.subFeatures?.[subFeature]?.isOpen ?? false;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={`${mainFeature}-${subFeature}`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
