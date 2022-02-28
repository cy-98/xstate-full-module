import { ReactElement, ReactNode } from "react";
import { render, Renderer } from "react-dom";
export { renderToString } from "react-dom/server";

export type RenderImplement =
  | Renderer
  | { (element: ReactElement): string }

// export type ComposeComponentsImplement = (View: ReactElement) => ReactNode[];
// export const composeComponents = () => {};
