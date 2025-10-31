import {
  IconBook,
  IconDatabase,
  IconLayoutSidebarRightExpand,
  IconSettings,
  IconUser,
  IconWorld,
} from "@tabler/icons-react";
import FeatureButton from "./FeatureButton";

type Props = {
  isMenuOpen: Boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Menu(props: Props) {
  return (
    <div
      className={`${
        props.isMenuOpen ? "w-65 border-r-4" : "w-11 border-r-2"
      } h-screen bg-white-100 flex flex-col items-center transition-all duration-250 ease-in-out border-gray-100 @container`}
    >
      {/* ロゴと開閉用ボタン */}
      <div className="flex justify-between my-8">
        <img
          src="/logo/dips-next.svg"
          alt="DIPS-NEXTロゴ"
          className={`${
            props.isMenuOpen ? "w-30" : "hidden"
          } mr-10 transition-all duration-250 ease-in-out`}
        />
        <IconLayoutSidebarRightExpand
          className={`${
            props.isMenuOpen ? "" : "rotate-180"
          } transition-all duration-250 ease-in-out text-gray-300 hover:text-gray-400`}
          onClick={() => props.setIsMenuOpen(!props.isMenuOpen)}
        />
      </div>
      {/* ユーザーが主要に使うメニュー */}
      <div className="w-65 flex flex-col gap-2 items-center">
        <FeatureButton text={"Overview"} icon={IconDatabase} />
        <FeatureButton text={"Preview"} icon={IconWorld} />
        <FeatureButton text={"Map Setting"} icon={IconSettings} />
      </div>
      {/* 下側のデフォルトメニュー */}
      <div className="w-full flex flex-col gap-2 mt-auto py-6 border-gray-100 border-t-3  items-center">
        <FeatureButton text={"Document"} icon={IconBook} />
        <FeatureButton text={"Account"} icon={IconUser} />
      </div>
    </div>
  );
}
