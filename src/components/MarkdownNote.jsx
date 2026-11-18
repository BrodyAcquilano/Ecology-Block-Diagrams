// Markdown note display component.
// Renders a markdown note with LaTeX equations (KaTeX).
// House format for notes: a title, a table of contents, then
// numbered sections — each with a header the contents links to —
// and equations on their own line, centred, never in the text.
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import "katex/dist/katex.min.css";

export function MarkdownNote({ source }) {
  return (
    <div className="note">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeSlug]}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
