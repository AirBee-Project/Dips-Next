import {
  IconBrandLaravel,
  IconDatabase,
  IconGraph,
  IconPackages,
  IconSquare,
  IconTable,
  IconWorld,
  type Icon,
  type IconProps,
} from "@tabler/icons-react";

type SubFeature = {
  name: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
};

export type Feature = {
  name: string;
  url: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  subFeatures?: SubFeature[];
};

export const MainFeatureList: Feature[] = [
  {
    name: "Overview",
    url: "/",
    icon: IconWorld,
    subFeatures: [
      {
        name: "Key Object",
        icon: IconPackages,
      },
      {
        name: "Key Object",
        icon: IconPackages,
      },
    ],
  },
  {
    name: "MyData",
    url: "/my-data",
    icon: IconDatabase,
  },
  {
    name: "Map Object",
    url: "/map-objcet",
    icon: IconBrandLaravel,
    subFeatures: [
      {
        name: "Key Object",
        icon: IconTable,
      },
      {
        name: "Value Object",
        icon: IconGraph,
      },
      {
        name: "ID Object",
        icon: IconPackages,
      },
    ],
  },
];
