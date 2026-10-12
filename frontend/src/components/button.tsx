
type buttonProps = {
  children: React.ReactNode,
  size?: "sm" | "md" | "lg",
  variant?: "primary" | "secondary" | "tertiary"
  onClick?: () => void
}

export default function Button ({children, size="md", variant="primary", onClick}: buttonProps) {

  const variants = {
    primary: "bg-purple-700 text-white hover:bg-purple-800",
    secondary: "bg-purple-200 text-purple-800 hover:bg-purple-300",
    tertiary: "border border-purple-200 bg-white text-purple-800 hover:bg-purple-50"
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }

  return <button onClick={onClick} className={`${sizes[size]} ${variants[variant]} flex gap-3 items-center justify-center rounded-xl`}>
    {children}
  </button>
}
