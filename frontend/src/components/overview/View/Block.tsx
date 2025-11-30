import React, { useState } from "react";
import { CheckBox } from "./BlockDetail/checkbox";
import { IconChevronDown } from "@tabler/icons-react";
import type { Node } from "./Node";
import type { CheckBoxItems } from "./BlockDetail/types";

type BlockProps = {
  node: Node
  index: number;
  onSelect: (node: Node) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  // onDropOnItem: (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => void;
  onBlockChanged: (node: Node, items: CheckBoxItems) => void;
};

/**
 * 最も基礎的なNode
 */
const Block: React.FC<BlockProps> = ({
  node,
  index,
  onSelect,
  onDragStart,
  // onDropOnItem,
  onBlockChanged
}) => {
  const [isOpenBlock, setIsOpenBlock] = useState(true);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      // onDrop={(e) => onDropOnItem(e, index,)}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => onSelect(node)}

      className="p-2 border rounded bg-gray-1 cursor-pointer hover:bg-gray-200 select-none "
    >
      <div className="flex justify-between">
        {node.type === "block" ? node.id : ""}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenBlock(!isOpenBlock);
          }}
          className="cursor-pointer "
        >
          <IconChevronDown
            className={`text-gray-200 hover:text-gray-400 transition-transform ${isOpenBlock ? "rotate-180" : ""
              }`}
          />

        </button>
      </div>
      {isOpenBlock && (
        <div>
          <CheckBox node={node} onChange={(items) => onBlockChanged?.(node, items)} />
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
