import { FlexibleContainerOptions } from 'remark-flexible-containers';
import remarkFlexibleContainers from 'remark-flexible-containers';
import remarkFlexibleToc from 'remark-flexible-toc';
import rehypePrettyCode, { type Options } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { EvaluateOptions } from 'next-mdx-remote-client/rsc';
import remarkMath from 'remark-math';
import rehypeKatex, { type Options as KatexOptions } from 'rehype-katex';
import remarkGfm from 'remark-gfm';

const prettyCodeOptions: Options = {
  theme: {
    dark: 'github-dark-high-contrast',
    light: 'github-light',
  },
  defaultLang: {
    inline: 'javascript',
  },
};

const rehypeKatexOptions: KatexOptions = {
  strict: false,
  output: 'mathml',
};

function toTitleCase(str: string | undefined) {
  if (!str) return;

  return str.replace(/\b\w+('\w{1})?/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

export const createEvaluateOptions = (): EvaluateOptions => ({
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [
      remarkGfm,
      [
        remarkFlexibleContainers,
        {
          title: () => null,
          containerTagName: 'admonition',
          containerProperties: (type, title) => ({
            ['data-type']: type?.toLowerCase(),
            ['data-title']: title ?? toTitleCase(type),
          }),
        } as FlexibleContainerOptions,
      ],
      remarkFlexibleToc,
      remarkMath,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, prettyCodeOptions],
      [rehypeKatex, rehypeKatexOptions],
    ],
  },
  vfileDataIntoScope: 'toc',
});
