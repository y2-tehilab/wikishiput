import styles from './entry-content.module.scss';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeToc from 'rehype-toc';
import rehypeSlug from 'rehype-slug';
import { useEffect } from 'react';

export default function EntryContent({ content }) {
  useEffect(() => {
    if (!document.querySelector('ol.toc-level')?.children?.length) {
      document.querySelector('nav.toc').style.display = 'none';
    } else {
      document.querySelector('nav.toc').style.display = 'inline-block';

      if (!document.querySelector('strong.toc-title')) {
        const strong = document.createElement('strong');
        strong.className = 'toc-title';
        strong.innerText = 'תוכן עניינים';
        document.querySelector('nav.toc')?.prepend(strong);
      }
    }

    if (document.querySelector('h2#footnote-label')) {
      const olItems = document.querySelector('ol.toc-level');
      document.querySelector('h2#footnote-label').remove();
      olItems?.removeChild(olItems?.lastChild);
    }
  }, [content]);

  return (
    <ReactMarkdown
      className={styles.entryContent}
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw, rehypeSlug, rehypeToc]}
    >
      {content}
    </ReactMarkdown>
  );
}
