export interface Options {
    animations?: {
      modal?: {
        enter?: string;
        leave?: string;
      };
      overlay?: {
        enter?: string;
        leave?: string;
      };
    };
    size?: {
      minWidth?: string;
      width?: string;
      maxWidth?: string;
      minHeight?: string;
      height?: string;
      maxHeight?: string;
    };
  }

