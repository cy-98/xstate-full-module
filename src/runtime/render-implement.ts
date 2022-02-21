import { ReactElement, ReactNode } from 'react';
import { render } from 'react-dom';

export type RenderImplement = RenderDOMImplement | RenderToStringImplement | ComposeComponentsImplement;

export type RenderDOMImplement = (View: ReactElement, root: HTMLElement) => void;
export const renderDOM = (View: ReactElement, root: HTMLElement) => render(View, root)

export type RenderToStringImplement = (View: ReactElement) => string;
export const renderToString = () => {

}
export type ComposeComponentsImplement = (View: ReactElement) => ReactNode[];
export const composeComponents = () => {

}
