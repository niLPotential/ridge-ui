import { Hono } from "@hono/hono";
// import { serveStatic } from "@hono/hono/deno";
import { jsxRenderer } from "@hono/hono/jsx-renderer";

import { src } from "client:script";

import { src as accordionSrc } from "client:script/accordion";
import AccordionDemo from "./components/accordion.tsx";

import { src as angleSliderSrc } from "client:script/angleSlider";
import AngleSliderDemo from "./components/angleSlider.tsx";

import { src as avatarSrc } from "client:script/avatar";
import AvatarDemo from "./components/avatar.tsx";

import { src as checkboxSrc } from "client:script/checkbox";
import CheckboxDemo from "./components/checkbox.tsx";

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

const base = import.meta.env.MODE === "production" ? "/ridge-ui" : "";

app.use(jsxRenderer(({ children, title, srcs }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {srcs?.map((_src) =>
        _src.module.map((s, i) => (
          <script type="module" src={base + s} key={i} />
        ))
      )}
      {src.module.map((_src, i) => (
        <script type="module" src={base + _src} key={i} />
      ))}
      {src.preload.map((href, i) => (
        <link
          rel="modulepreload"
          crossorigin=""
          href={base + href}
          key={i}
        />
      ))}
      {src.style.map((href, i) => (
        <link rel="stylesheet" href={base + href} key={i} />
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
      <ul>
        <li>
          <a href="./accordion/">accordion</a>
        </li>
        <li>
          <a href="./angle-slider/">angle slider</a>
        </li>
        <li>
          <a href="./checkbox/">checkbox</a>
        </li>
      </ul>
    </div>,
    { title: "Home" },
  ));
app.get("/accordion/", (c) =>
  c.render(<AccordionDemo />, {
    title: "Accordion",
    srcs: [accordionSrc],
  }));
app.get(
  "/angle-slider/",
  (c) =>
    c.render(<AngleSliderDemo />, {
      title: "Angle Slider",
      srcs: [angleSliderSrc],
    }),
);
app.get("/avatar/", (c) =>
  c.render(<AvatarDemo />, {
    title: "Avatar",
    srcs: [avatarSrc],
  }));
app.get(
  "/checkbox/",
  (c) =>
    c.render(<CheckboxDemo />, {
      title: "Checkbox",
      srcs: [checkboxSrc],
    }),
);

// Not needed for SSG
// app.use(
//   "/_immutable/*",
//   serveStatic({ root: "./dist/client/" }),
// );

export default {
  fetch: app.fetch,
  prerender: ["/", "/accordion/", "/angle-slider/", "/checkbox/"],
};
