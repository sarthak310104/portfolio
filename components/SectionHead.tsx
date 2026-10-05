export default function SectionHead({
  index,
  eyebrow,
  title,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-head">
      <div className="section-meta mono">
        <span className="section-index">// {index}</span>
        <span className="section-line" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="section-title">{title}</h2>
      {children}
    </div>
  );
}