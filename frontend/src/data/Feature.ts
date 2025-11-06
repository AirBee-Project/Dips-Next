import {
  IconBook,
  IconBrandLaravel,
  IconCalculator,
  IconDatabase,
  IconGraph,
  IconLicense,
  IconPackages,
  IconTable,
  IconUser,
  IconWorld,
  type Icon,
  type IconProps,
} from "@tabler/icons-react";

type SubFeature = {
  name: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  isOpen: boolean;
};

export type Feature = {
  name: string;
  url: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  subFeatures?: Record<string, SubFeature>;
};
export const MainFeatureList: Record<string, Feature> = {
  Overview: {
    name: "Overview",
    url: "/",
    icon: IconWorld,
    subFeatures: {
      KeyObject: {
        name: "Key Object",
        icon: IconPackages,
        isOpen: false,
      },
      ViewManager: {
        name: "View Manager",
        icon: IconCalculator,
        isOpen: false,
      },
    },
  },
  MyData: {
    name: "MyData",
    url: "/my-data",
    icon: IconDatabase,
    subFeatures: {
      KeyObject: {
        name: "属性を設定",
        icon: IconTable,
        isOpen: false,
      },
      ValueObject: {
        name: "IDに値を設定",
        icon: IconPackages,
        isOpen: false,
      },
    },
  },
  MapObject: {
    name: "Map Object",
    url: "/map-objcet",
    icon: IconBrandLaravel,
  },
};

export const SubFeatureList: Record<string, Feature> = {
  License: {
    name: "License",
    url: "/license",
    icon: IconLicense,
  },
  Document: {
    name: "Document",
    url: "/document",
    icon: IconBook,
  },
  Account: {
    name: "Account",
    url: "/account",
    icon: IconUser,
  },
};
