export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function externalLinkProps(href: string) {
  const isExternal = href.startsWith("http");

  return isExternal
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};
}
