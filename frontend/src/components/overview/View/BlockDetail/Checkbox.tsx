import { useEffect, useState } from "react";
import type { CheckBoxItems } from "./types";
import { loadJson } from "../../../../utils/loadJson";
import type { Node } from "../Node";

type Props = {
  node: Node;
  onChange?: (items: CheckBoxItems) => void;
}
export const CheckBox = ({ node, onChange }: Props) => {
  const [checkBoxItems, setCheckBoxItems] = useState<CheckBoxItems>();
  useEffect(() => {
    const fetchItems = async () => {
      if (node.type !== "block") {
        return
      }
      const item_json = await loadJson(node.id);
      console.log(item_json)
      const checkBoxItems = Object.keys(item_json).map((key) => ({
        name: key,
        checked: false
      }));

      // console.log(checkBoxItems);
      setCheckBoxItems(checkBoxItems);
    };

    fetchItems();
  }, [])

  // 変更時に上へ通知
  const handleChange = (name: string) => {
    setCheckBoxItems((prev) => {
      const updated =
        prev?.map((item) =>
          item.name === name ? { ...item, checked: !item.checked } : item
        ) ?? [];
      onChange?.(updated);

      return updated;
    });
  };

  return (
    <div>
      {checkBoxItems?.map((item) => {
        return (
          <div className="flex justify-start">
            <input type="checkbox" checked={item.checked} onChange={() => handleChange(item.name)} />
            <div>{item.name}</div>
          </div>
        )
      })}
    </div>
  )
}