import { Link, useLocation } from "react-router";
import type { Feature } from "../../../data/Feature";
import { IconTriangleInvertedFilled } from "@tabler/icons-react";
import { useMenu } from "../../../context/Menu";

type Props = {
  mainKey: string;
  feature: Feature;
};

export default function FeatureButton(props: Props) {
  const location = useLocation();
  const isActive = location.pathname === props.feature.url;
  const { setFeatures } = useMenu();

  return (
    <div
      className={`transition-all duration-100 ease-in-out rounded-md ${
        isActive
          ? " border-accent-200 border-2"
          : "hover:bg-gray-100 hover:text-gray-400"
      }`}
    >
      <Link to={props.feature.url} className="group">
        <div
          className={`flex py-1.5 px-2 @max-[10rem]:justify-center @max-[10rem]:px-0
          cursor-pointer w-52 @max-[10rem]:w-10 items-center
          ${isActive ? "text-accent-300" : "text-gray-400"}
          `}
        >
          <div className="h-7 aspect-square flex items-center justify-center">
            <props.feature.icon />
          </div>
          <p className="ml-2 font-extrabold @max-[10rem]:hidden w-28">
            {props.feature.name}
          </p>
        </div>
      </Link>
      {props.feature.subFeatures ? (
        <div
          className={`overflow-hidden transition-all ease-in-out ${
            isActive
              ? "max-h-96 opacity-100 duration-700"
              : "max-h-0 opacity-0 duration-700"
          }`}
        >
          <div className="w-full border border-accent-200"></div>
          <div className="py-1">
            {Object.entries(props.feature.subFeatures).map(([subKey, item]) => (
              <div
                className={`flex items-center px-2 text-1.5xl @max-[10rem]:w-10 @max-[10rem]:px-0 @max-[10rem]:justify-center w-full cursor-pointer my-2
 duration-200 ${item.isOpen ? "" : "text-gray-200 hover:text-gray-250"}`}
                key={subKey}
                onClick={() => {
                  setFeatures((prev) => {
                    const featureKey = props.mainKey;

                    // 既存サブ機能を取得（undefined対策も含む）
                    const target = prev[featureKey].subFeatures?.[subKey];
                    if (!target) return prev; // 存在しない場合はスキップ

                    return {
                      ...prev,
                      [featureKey]: {
                        ...prev[featureKey],
                        subFeatures: {
                          ...prev[featureKey].subFeatures,
                          [subKey]: {
                            ...target,
                            isOpen: !target.isOpen,
                          },
                        },
                      },
                    };
                  });
                }}
              >
                <div className="h-7 aspect-square flex items-center justify-center">
                  <item.icon size={20} />
                </div>
                <div className="flex @max-[10rem]:hidden @max-[10rem]:opacity-0">
                  <div className="w-30">
                    <p className="ml-2 @max-[10rem]:ml-0 truncate">
                      {item.name}
                    </p>
                  </div>
                  <div className="h-5 aspect-square flex items-center justify-center">
                    <IconTriangleInvertedFilled
                      size={12}
                      className={`transition-all ease-in-out ${
                        props.feature.subFeatures ? "visible" : "hidden"
                      } ${item.isOpen ? "rotate-270" : "rotate-90"}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
