import {
  IconBook,
  IconBrandLaravel,
  IconDatabase,
  IconLayoutSidebarRightExpand,
  IconLicense,
  IconUser,
  IconWorld,
} from "@tabler/icons-react";
import FeatureButton from "./FeatureButton";
import { useMenu } from "../../../context/Menu";

export default function Menu() {
  const { isMenuOpen, toggleMenu } = useMenu();

  return (
    <div
      className={`${
        isMenuOpen ? "w-65 border-r-4" : "w-11 border-r-2"
      } h-screen bg-white-100 flex flex-col items-center transition-all duration-250 ease-in-out border-gray-100 @container`}
    >
      {/* ロゴと開閉用ボタン */}
      <div className="flex justify-between my-8">
        <img
          src="/logo/dips-next.svg"
          alt="DIPS-NEXTロゴ"
          className={`${
            isMenuOpen ? "w-30" : "hidden"
          } mr-10 transition-all duration-250 ease-in-out`}
        />
        <IconLayoutSidebarRightExpand
          className={`${
            isMenuOpen ? "" : "rotate-180"
          } transition-all duration-250 ease-in-out text-gray-300 hover:text-gray-400 cursor-pointer`}
          onClick={toggleMenu}
        />
      </div>

      {/* ユーザーが主要に使うメニュー */}
      <div className="w-65 flex flex-col gap-2 items-center">
        <FeatureButton link="/" text={"Overview"} icon={IconWorld} />
        <FeatureButton link="/mydata" text={"MyData"} icon={IconDatabase} />

        <FeatureButton
          link="/map-object"
          text={"Map Object"}
          icon={IconBrandLaravel}
        />
      </div>

      {/* 下側のデフォルトメニュー */}
      <div className="w-full flex flex-col gap-2 mt-auto py-6 border-gray-100 border-t-3 items-center">
        <FeatureButton text={"License"} icon={IconLicense} link={""} />
        <FeatureButton text={"Document"} icon={IconBook} link={""} />
        <FeatureButton text={"Account"} icon={IconUser} link={""} />
      </div>
    </div>
  );
}
