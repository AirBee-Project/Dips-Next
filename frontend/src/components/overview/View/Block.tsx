import React, { useEffect, useState } from "react";
import type { DroppedItem } from "./View";
import { CheckBox } from "./BlockDetail/checkbox";
import { loadJson } from "../../../utils/loadJson";

type BlockProps = {
  item: DroppedItem;
  index: number;
  onSelect: (id: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  // onDropOnItem: (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => void;
};

/**
 * 最も基礎的なNode
 */
const Block: React.FC<BlockProps> = ({
  item,
  index,
  onSelect,
  onDragStart,
  // onDropOnItem,
}) => {
  const [isOpenBlock, setIsOpenBlock] = useState(true);

  // const item_json = loadJson(item.id)
  // const checkBoxItems = Object.keys(item_json).map((key) => ({
  //   name: key,
  //   checked: false
  // }));

  // console.log(checkBoxItems);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      // onDrop={(e) => onDropOnItem(e, index,)}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => onSelect(item.id)}

      className="p-2 border rounded bg-gray-1 cursor-pointer hover:bg-gray-200 select-none"
    >
      {item.id}
      {isOpenBlock && (
        <div>
          <CheckBox id={item.id} />
          {/* {props.info && (
            <div className="text-1xl text-gray-200 py-2 border-t-2 border-gray-100">
              <table>
                <tbody>
                  {props.info.map((item, index) => (
                    <tr key={index} className="text-left">
                      <td className="font-medium">{item.title}</td>
                      <th>：</th>
                      <th className="font-medium">{item.text}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )} */}
        </div>
      )
      }
    </div >
  );
};

export default Block;
