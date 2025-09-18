import type { Scope } from "@zag-js/core";

export const getRootId = (ctx: Scope) => ctx.ids?.root ?? `combobox:${ctx.id}`;
export const getLabelId = (ctx: Scope) =>
  ctx.ids?.label ?? `combobox:${ctx.id}:label`;
export const getControlId = (ctx: Scope) =>
  ctx.ids?.control ?? `combobox:${ctx.id}:control`;
export const getInputId = (ctx: Scope) =>
  ctx.ids?.input ?? `combobox:${ctx.id}:input`;
export const getContentId = (ctx: Scope) =>
  ctx.ids?.content ?? `combobox:${ctx.id}:content`;
export const getPositionerId = (ctx: Scope) =>
  ctx.ids?.positioner ?? `combobox:${ctx.id}:popper`;
export const getTriggerId = (ctx: Scope) =>
  ctx.ids?.trigger ?? `combobox:${ctx.id}:toggle-btn`;
export const getClearTriggerId = (ctx: Scope) =>
  ctx.ids?.clearTrigger ?? `combobox:${ctx.id}:clear-btn`;
export const getItemGroupId = (ctx: Scope, id: string | number) =>
  ctx.ids?.itemGroup?.(id) ?? `combobox:${ctx.id}:optgroup:${id}`;
export const getItemGroupLabelId = (ctx: Scope, id: string | number) =>
  ctx.ids?.itemGroupLabel?.(id) ?? `combobox:${ctx.id}:optgroup-label:${id}`;
export const getItemId = (ctx: Scope, id: string) =>
  ctx.ids?.item?.(id) ?? `combobox:${ctx.id}:option:${id}`;
