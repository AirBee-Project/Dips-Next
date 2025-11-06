import { Link, useLocation } from "react-router";
import type { Feature } from "../../../data/Feature";
import {
  IconCircleChevronsRightFilled,
  IconTriangleInvertedFilled,
} from "@tabler/icons-react";

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
          <div className="h-5 aspect-square flex items-center justify-center @max-[10rem]:hidden">
            <IconTriangleInvertedFilled
              size={10}
              className={`mt-0.5 transition-all duration-300 ease-in-out ${
                props.subFeatures ? "visible" : "hidden"
              } ${isActive ? "-rotate-90" : "rotate-0"}`}
            />
          </div>
        </div>
      </Link>
      {props.subFeatures ? (
        <div
          className={`overflow-hidden transition-all ease-in-out ${
            isActive
              ? "max-h-96 opacity-100 duration-700"
              : "max-h-0 opacity-0 duration-700"
          }`}
        >
          <div className="w-full border border-white"></div>
          <div className="py-2">
            {props.subFeatures?.map((item) => (
              <div className="flex items-center px-2 text-gray-300 text-1.5xl @max-[10rem]:w-10 @max-[10rem]:px-0">
                <div className="h-7 aspect-square flex items-center justify-center">
                  <item.icon size={20} />
                </div>
                <div className="w-30">
                  <p className="ml-2 @max-[10rem]:ml-0 @max-[10rem]:hidden">
                    {item.name}
                  </p>
                </div>
                <div className="h-5 aspect-square flex items-center justify-center @max-[10rem]:hidden">
                  <IconCircleChevronsRightFilled
                    size={15}
                    className={`mt-0.5 transition-all duration-300 ease-in-out ${
                      props.subFeatures ? "visible" : "hidden"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
