import { source as javascriptWiki } from './javascript-wiki';

export const sources = {
  javascriptWiki,
};

export type SourceOptions = keyof typeof sources;

export type Sources = typeof sources;
