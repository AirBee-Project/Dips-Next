import { Link, useLocation } from "react-router";
import type { Feature } from "../../../data/Feature";
import { IconTriangleInvertedFilled } from "@tabler/icons-react";

export default function FeatureButton(props: Feature) {
  const location = useLocation();
  const isActive = location.pathname === props.url;

  return (
    <div
      className={`transition-all duration-100 ease-in-out rounded-md ${
        isActive ? "bg-gray-100" : "hover:bg-gray-100 hover:text-gray-400"
      }`}
    >
      <Link to={props.url}>
        <div
          className={`flex text-gray-400 py-1.5 px-2 @max-[10rem]:justify-center @max-[10rem]:px-0
          cursor-pointer w-52 @max-[10rem]:w-10 items-center
          `}
        >
          <div className="h-7 aspect-square flex items-center justify-center">
            <props.icon />
          </div>
          <p className="font-extrabold @max-[10rem]:hidden w-30 ">
            <p className="ml-2">{props.name}</p>
          </p>
          <IconTriangleInvertedFilled
            size={10}
            className={`mt-0.5 ${props.subFeatures ? "visible" : "hidden"} ${
              isActive ? "rotate-270" : "rotate-0"
            }`}
          />
        </div>
      </Link>
      {props.subFeatures ? (
        <div>
          <div className="w-full border border-white"></div>
          <div className="py-2">
            {props.subFeatures?.map((item) => (
              <div className="flex items-center px-2 text-gray-300 text-1.5xl">
                <div className="h-7 aspect-square flex items-center justify-center">
                  <item.icon size={20} />
                </div>
                <div className="w-30">
                  <p className="ml-2">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
