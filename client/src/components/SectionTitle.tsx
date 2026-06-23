type SectionTitleProps = {
  title: string
  description?: string
}

export function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-semibold text-white">{title}</h2>
      {description ? <p className="max-w-2xl text-slate-300">{description}</p> : null}
    </div>
  )
}
