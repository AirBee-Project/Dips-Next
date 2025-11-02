import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

// Zodスキーマを作成
const postSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "本文は必須です"),
  tags: z.array(z.string()).optional(),
});

// POSTエンドポイント（zValidatorを使用）
const route = app.post("/posts", zValidator("json", postSchema), async (c) => {
  // バリデーション済みのデータを取得
  const validatedData = c.req.valid("json");

  // バリデーション成功
  return c.json({ message: "投稿が作成されました", data: validatedData });
});

export default app;
export type AppType = typeof route;
