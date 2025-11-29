import { useEffect, useState } from "react";
import type { CheckBoxItems } from "./types";
import { loadJson } from "../../../../utils/loadJson";

type Props = {
  id: string
}
export const CheckBox = (props: Props) => {
  const [checkBoxItems, setCheckBoxItems] = useState<CheckBoxItems>()

  useEffect(() => {
    const fetchItems = async () => {
      const item_json = await loadJson(props.id);
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

  useEffect(() => {
    //  ここで監視して再計算かな
  }, [checkBoxItems])

  const handleChange = (name: string) => {
    setCheckBoxItems((prevItems) =>
      prevItems?.map((item) =>
        item.name === name ? { ...item, checked: !item.checked } : item
      )
    );
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