import { Link, useLocation } from "react-router";
import type { Feature } from "../../../data/Feature";
import {
  IconCircleChevronsRightFilled,
  IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import { useMenu } from "../../../context/Menu";

type Props = {
  key: string;
  feature: Feature;
};

export default function FeatureButton(props: Props) {
  const location = useLocation();
  const isActive = location.pathname === props.feature.url;
  const { features, setFeatures } = useMenu();

  return (
    <div
      className={`transition-all duration-100 ease-in-out rounded-md ${
        isActive ? "bg-gray-100" : "hover:bg-gray-100 hover:text-gray-400"
      }`}
    >
      <Link to={props.feature.url} className="group">
        <div
          className={`flex text-gray-400 py-1.5 px-2 @max-[10rem]:justify-center @max-[10rem]:px-0
          cursor-pointer w-52 @max-[10rem]:w-10 items-center
          `}
        >
          <div className="h-7 aspect-square flex items-center justify-center">
            <props.feature.icon />
          </div>
          <p className="font-extrabold @max-[10rem]:hidden w-30 ">
            <p className="ml-2">{props.feature.name}</p>
          </p>
          <div className="h-5 aspect-square flex items-center justify-center @max-[10rem]:hidden">
            <IconTriangleInvertedFilled
              size={10}
              className={`mt-0.5 transition-all duration-300 ease-in-out ${
                props.feature.subFeatures ? "visible" : "hidden"
              } ${isActive ? "-rotate-90" : "rotate-0 group-hover:-rotate-90"}`}
            />
          </div>
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
          <div className="w-full border border-white"></div>
          <div className="py-2">
            {Object.entries(props.feature.subFeatures).map(([subkey, item]) => (
              <div
                className={`flex items-center px-2 text-1.5xl @max-[10rem]:w-10 @max-[10rem]:px-0 @max-[10rem]:justify-center w-full cursor-pointer
 duration-200 ${
   item.isOpen
     ? "text-gray-400 hover:text-gray-200"
     : "text-gray-200 hover:text-gray-400"
 }`}
                key={subkey}
                onClick={() => {
                  setFeatures((prev) => {
                    const featureKey = props.feature.name;
                    const subKey = subkey;

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
                            ...target, // ← name と icon を維持する
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
                <div className="flex @max-[10rem]:hidden @max-[10rem]:opacity-0 @max-[10rem]:pr-30">
                  <div className="w-30">
                    <p className="ml-2 @max-[10rem]:ml-0 truncate">
                      {item.name}
                    </p>
                  </div>
                  <div className="h-5 aspect-square flex items-center justify-center">
                    <IconCircleChevronsRightFilled
                      size={15}
                      className={`transition-all ease-in-out ${
                        props.feature.subFeatures ? "visible" : "hidden"
                      } ${item.isOpen ? "rotate-0" : "rotate-180"}`}
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
