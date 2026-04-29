interface PageHeaderProps {
  label: string
  title: string
  subtitle?: string
}

export function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-brand-dark to-brand py-14 pt-20">
      <div className="container mx-auto px-6">
        <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-accent mb-2">
          {label}
        </span>
        <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[15px] text-white/65 mt-2.5 max-w-[520px]">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
