
export default function PageTitle({
    children,
  }: {
    children: string
  }) {
    return (
      <div className="text-3xl">
        {children}
      </div>
    )
  }
  