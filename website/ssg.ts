import { toSSG } from "@hono/hono/deno";
import app from "./dist/server/app.js";

// @ts-ignore app is Hono
await toSSG(app, { dir: "./dist/client" });
