import type { MDXComponents } from 'mdx/types';

/** Styling for optional free-form MDX bodies in case files. */
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="text-xl font-semibold text-ink" {...props} />,
  h3: (props) => <h3 className="text-lg font-semibold text-ink" {...props} />,
  p: (props) => <p className="leading-relaxed text-muted" {...props} />,
  ul: (props) => <ul className="flex flex-col gap-2 text-muted" {...props} />,
  li: (props) => <li className="ml-4 list-disc" {...props} />,
  a: (props) => (
    <a className="text-accent underline underline-offset-2" {...props} />
  ),
  strong: (props) => <strong className="text-ink" {...props} />,
};
