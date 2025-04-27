"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@pfl-wsr/ui";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
}) => {
  return (
    <div
      className={cn(
        "prose max-w-none prose-invert",
        // Heading styles
        "prose-headings:font-semibold prose-headings:text-foreground",
        "prose-h1:mt-1 prose-h1:mb-2 prose-h1:text-xl",
        "prose-h2:mt-2 prose-h2:mb-1 prose-h2:text-lg",
        "prose-h3:mt-1.5 prose-h3:mb-1 prose-h3:text-base",

        // Paragraph and list styles
        "prose-p:my-1.5 prose-p:text-foreground/85",
        "prose-li:text-foreground/85",
        "prose-ol:my-2 prose-ul:my-2",

        // Code block styles
        "prose-code:rounded prose-code:bg-background/70 prose-code:px-1 prose-code:py-0.5 prose-code:font-normal prose-code:text-accent",
        "prose-pre:border prose-pre:border-accent/20 prose-pre:bg-background/50 prose-pre:shadow-glass-inset",

        // Table styles
        "prose-table:border prose-table:border-accent/20",
        "prose-th:border prose-th:border-accent/20 prose-th:bg-background/70 prose-th:p-2 prose-th:text-foreground",
        "prose-td:border prose-td:border-accent/20 prose-td:p-2",

        // Blockquote styles
        "prose-blockquote:border-l-accent prose-blockquote:bg-background/30 prose-blockquote:py-0.5 prose-blockquote:pr-2 prose-blockquote:pl-4 prose-blockquote:italic",

        // Link and emphasis styles
        "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
        "prose-strong:font-semibold prose-strong:text-foreground",
        "prose-em:text-foreground/90",

        // Image styles
        "prose-img:mx-auto prose-img:my-4 prose-img:rounded-md prose-img:border prose-img:border-accent/20",

        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
