type assetsType = "String" | "Number";

export const assetsTypeInfo: { assetsType: assetsType; text: string }[] = [
  {
    assetsType: "String",
    text: "文字列",
  },
  {
    assetsType: "Number",
    text: "数値",
  },
];

type Props = {
  title: String;
  assetsType: assetsType;
};

export default function Asset(props: Props) {
  return (
    <div className="py-1.5 border-gray-100 border-3 rounded-md">
      <p>{props.title}</p>
    </div>
  );
}
