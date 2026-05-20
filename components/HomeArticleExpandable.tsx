"use client";

import { useState } from "react";

type HomeArticleExpandableProps = {
  initialHtml: string;
  restHtml: string;
};

export default function HomeArticleExpandable({ initialHtml, restHtml }: HomeArticleExpandableProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="prose-custom" dangerouslySetInnerHTML={{ __html: initialHtml }} />
      {restHtml && (
        <>
          {expanded && <div className="prose-custom mt-0" dangerouslySetInnerHTML={{ __html: restHtml }} />}
          <button
            type="button"
            className="btn-ghost mt-8 rounded-full px-6 py-3 text-sm"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
          >
            {expanded ? "Show Less" : "Show More"} -&gt;
          </button>
        </>
      )}
    </>
  );
}
