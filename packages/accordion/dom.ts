import type { Scope } from "@zag-js/core";

export const getRootId = (ctx: Scope) => ctx.ids?.root ?? `accordion:${ctx.id}`;
export const getItemId = (ctx: Scope, value: string) =>
  ctx.ids?.item?.(value) ?? `accordion:${ctx.id}:item:${value}`;
export const getItemContentId = (ctx: Scope, value: string) =>
  ctx.ids?.itemContent?.(value) ?? `accordion:${ctx.id}:content:${value}`;
export const getItemTriggerId = (ctx: Scope, value: string) =>
  ctx.ids?.itemTrigger?.(value) ?? `accordion:${ctx.id}:trigger:${value}`;
