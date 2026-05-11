import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

/** External links open in a new tab with safe rel defaults. */
export function ExternalLink({ children, rel, ...rest }: Props) {
  return (
    <a
      target="_blank"
      rel={rel ?? "noopener noreferrer"}
      {...rest}
    >
      {children}
    </a>
  );
}
