import {
  IconBook,
  IconDatabase,
  IconLayoutSidebarRightExpand,
  IconNotification,
  IconSettings,
  IconUser,
  IconWorld,
} from "@tabler/icons-react";
import FeatureButton from "./FeatureButton";
import { useState } from "react";

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`${
        isMenuOpen ? "w-65 border-r-4" : "w-10 border-r-2"
      } h-screen bg-white-100 flex flex-col items-center transition-all duration-200 ease-in-out border-gray-100`}
    >
      <div className="flex w-50 justify-between my-8">
        <img src="/logo/dips-next.svg" alt="DIPS-NEXTロゴ" className="w-30" />
        <IconLayoutSidebarRightExpand
          style={{ color: "#2e2f2e" }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>
      {/* ユーザーが主要に使うメニュー */}
      <div className="w-65 flex flex-col gap-2 items-center">
        <FeatureButton text={"Overview"} icon={IconDatabase} />
        <FeatureButton text={"Preview"} icon={IconWorld} />
        <FeatureButton text={"Map Setting"} icon={IconSettings} />
      </div>
      {/* 下側のデフォルトメニュー */}
      <div className="w-65 flex flex-col gap-2 mt-auto py-6 border-gray-100 border-t-3  items-center">
        <FeatureButton text={"Document"} icon={IconBook} />
        <FeatureButton text={"Your Account"} icon={IconUser} />
      </div>
    </div>
  );
}
