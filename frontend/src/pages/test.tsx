import { hc } from "hono/client";
import type { AppType } from "../../../backend/src/index";

const client = hc<AppType>("http://localhost:3000/");

// 使用例

const res = await client.posts.$post({
  json: {
    title: "",
    content: "",
  },
});
