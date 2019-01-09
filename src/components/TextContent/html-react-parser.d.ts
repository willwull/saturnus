declare module "html-react-parser" {
  export interface DomHandler {
    next: DomHandler[] | null;
    prev: DomHandler[] | null;
    parent: DomHandler[] | null;
    data: string;
    type: "text" | "script" | "tag" | "comment";
    name?: string;
    attribs?: any;
    children?: DomHandler[];
  }

  export interface ParserOptions {
    replace: (domNode: DomHandler) => React.ReactNode | DomHandler | undefined;
  }

  function HTMLReactParser(
    html: string,
    options?: ParserOptions,
  ): React.ReactNode;

  export default HTMLReactParser;
}
