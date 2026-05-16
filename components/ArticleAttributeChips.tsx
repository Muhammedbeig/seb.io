import type { ArticleAttribute } from "@/lib/cms";

type ArticleAttributeChipsProps = {
  attributes?: ArticleAttribute[];
  defaultExpanded?: boolean;
};

export default function ArticleAttributeChips({ attributes = [] }: ArticleAttributeChipsProps) {
  const cleanAttributes = attributes.filter((attribute) => attribute.label?.trim());

  if (!cleanAttributes.length) return null;

  return (
    <div className="flex max-w-full min-w-0 flex-wrap items-center gap-1.5">
      {cleanAttributes.map((attribute, index) => {
        const label = attribute.label.trim();

        return (
          <span
            key={`${label}-${index}`}
            title={label}
            className="inline-flex max-w-full rounded-[3px] border px-2 py-0.5 text-[10px] font-medium leading-[1.25]"
            style={{
              borderColor: `${attribute.color}55`,
              background: `${attribute.color}18`,
              color: attribute.color,
              fontFamily: "var(--font-dm-mono)",
              whiteSpace: "normal",
              overflowWrap: "anywhere",
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}
