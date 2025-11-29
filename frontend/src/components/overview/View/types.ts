export type Node =
  | {
    type: "block";
    id: string;
  }
  | {
    type: "group";
    groupType: "AND" | "OR";
    children: Node[];
  };