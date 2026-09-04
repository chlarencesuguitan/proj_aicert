import Link from 'next/link'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-bold text-gray-900 ${className}`}
      aria-label="AQBAT home"
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-lg font-black text-gray-900"
      >
        α
      </span>
      <span className="text-xl tracking-tight">AQBAT</span>
    </Link>
  )
}
