import Block from "./Block";
import type { Node } from "./Node"

type NodeRendererProps = {
  node: Node;
  index: number;
  onSelect: (node: Node) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
};

/**
 * 演算を行ってできたNode
 */
export const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  index,
  onSelect,
  onDragStart,
}) => {
  if (node.type === "block") {
    return (
      <Block
        key={node.id}
        node={node}
        index={index}
        onSelect={onSelect}
        onDragStart={onDragStart}
      />
    );
  } else {
    return (
      <div className="group-node">
        <span>{node.groupType}</span>
        <div className="children">
          {node.children.map((child, i) => (
            <NodeRenderer
              key={i}
              node={child}
              index={i}
              onSelect={onSelect}
              onDragStart={onDragStart}
            />
          ))}
        </div>
      </div>
    );
  }
};