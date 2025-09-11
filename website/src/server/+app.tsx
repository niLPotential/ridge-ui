import { Hono } from "@hono/hono";
// import { serveStatic } from "@hono/hono/deno";
import { jsxRenderer } from "@hono/hono/jsx-renderer";

import { src } from "client:script";
import { src as checkboxSrc } from "client:script/checkbox";
import CheckBoxDemo from "./components/checkbox.tsx";

declare module "@hono/hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props: {
        title: string;
        srcs?: Src[];
      },
    ): Response;
  }
}

const app = new Hono();

app.use(jsxRenderer(({ children, title, srcs }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {srcs?.map((_src) =>
        _src.module.map((s, i) => (
          <script type="module" src={"." + s} key={i} />
        ))
      )}
      {src.module.map((_src, i) => (
        <script type="module" src={"." + _src} key={i} />
      ))}
      {src.preload.map((href, i) => (
        <link rel="modulepreload" crossorigin="" href={"." + href} key={i} />
      ))}
      {src.style.map((href, i) => (
        <link rel="stylesheet" href={"." + href} key={i} />
      ))}
      <title>{title} - Ridge UI</title>
    </head>
    <body>
      {children}
    </body>
  </html>
)));

app.get("/", (c) =>
  c.render(
    <div>
      <a href="./checkbox">checkbox</a>
    </div>,
    { title: "Home" },
  ));
app.get(
  "/checkbox/",
  (c) =>
    c.render(<CheckBoxDemo />, {
      title: "Checkbox",
      srcs: [checkboxSrc],
    }),
);

// Not needed for SSG
// app.use(
//   "/_immutable/*",
//   serveStatic({ root: "./dist/client/" }),
// );

export default { ...app, prerender: ["/", "/checkbox/"] };
