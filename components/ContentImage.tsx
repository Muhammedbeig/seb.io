import { contentAvifFor } from "@/lib/contentImages";

type ContentImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export default function ContentImage({
  src,
  alt,
  className = "block h-full w-full",
  imageClassName = "h-full w-full object-cover",
  width,
  height,
  priority = false,
}: ContentImageProps) {
  const avifSrc = contentAvifFor(src);

  return (
    <picture className={className}>
      {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={imageClassName}
      />
    </picture>
  );
}
