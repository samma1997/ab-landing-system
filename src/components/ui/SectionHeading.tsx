interface SectionHeadingProps {
  title?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, centered = true, light }: SectionHeadingProps) {
  if (!title) return null;
  return (
    <div className={centered ? "text-center mb-12" : "mb-12"}>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 ${
          light ? "text-white" : "text-secondary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${light ? "text-gray-300" : "text-gray-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
