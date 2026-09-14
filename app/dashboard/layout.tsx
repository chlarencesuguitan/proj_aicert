import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-surface border-r border-border flex flex-col">
        <div className="px-6 py-5 border-b border-border">
          <span className="font-semibold text-lg text-foreground">Aquibat</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:bg-background hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/courses"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:bg-background hover:text-foreground"
          >
            My Courses
          </Link>
        </nav>

        <form action="/auth/signout" method="post" className="px-3 py-4 border-t border-border">
          <button
            type="submit"
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted hover:bg-background hover:text-foreground"
          >
            Log out
          </button>
        </form>
      </aside>

      {/* Page content */}
      <div className="flex-1 bg-background">
        {children}
      </div>
    </div>
  )
}