import type { JSXAttribute, JSXElement, JSXText } from "@babel/types";

export type JsxChild = JSXElement | JSXText;
export type TransformContext = {
  element: Node;
  depth: number;
  parentDepth?: string;
  parentNode: HTMLElement | null;
  target?: {
    element: string;
    attributes?: JSXAttribute[];
    children?: JsxChild[];
  } | null;
};

export type Matcher = (ctx: TransformContext) => boolean;

export type Transform = (ctx: TransformContext) => TransformContext;

export interface Rule {
  id: string;
  description?: string;
  match: Matcher;
  transform: Transform;
  skipAllRest?: boolean;
}

export type RuleExecutor = (ctx: TransformContext) => TransformContext;
