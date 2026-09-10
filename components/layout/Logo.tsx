import Link from 'next/link'
import Image from 'next/image'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-bold text-gray-900 ${className}`}
      aria-label="AQBAT home"
    >
      <span
        aria-hidden="true"
        className="flex h-10 w-30 items-center justify-center"
      >
        <Image src="/images/logo_nav.png" alt="Logo" width={120} height={120} />
      </span>
      {/* <span className="text-xl tracking-tight">AQBAT</span> */}
    </Link>
  )
}
