'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CourseModule } from '@/lib/courses/structure'

export function CourseSidebar({
  courseTitle,
  structure,
  courseId,
  currentLessonId,
}: {
  courseTitle: string
  structure: CourseModule[]
  courseId: string
  currentLessonId: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 bg-foreground text-white px-3 py-2 rounded-lg text-sm"
      >
        ☰ Course menu
      </button>

      {/* Overlay backdrop on mobile when open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar itself */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full md:h-auto z-30
          w-72 shrink-0 border-r border-border bg-surface p-4 overflow-y-auto
          transition-transform duration-200
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between mb-4 md:block">
          <h2 className="font-semibold text-foreground">{courseTitle}</h2>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-muted">
            ✕
          </button>
        </div>

        <nav className="space-y-4">
          {structure.map((mod) => (
            <div key={mod.id}>
              <p className="text-sm font-medium text-muted mb-1">{mod.title}</p>
              <ul className="space-y-1">
                {mod.lessons.map((l) => {
                  const isActive = l.id === currentLessonId
                  return (
                    <li key={l.id}>
                      <Link
                        href={`/learn/${courseId}/${mod.id}/${l.id}`}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${
                          isActive
                            ? 'bg-brand text-white'
                            : 'text-foreground hover:bg-background'
                        }`}
                      >
                        <span
                          className={`inline-block h-2 w-2 rounded-full shrink-0 ${
                            l.completed ? 'bg-brand-light' : 'bg-border'
                          } ${isActive ? '!bg-white' : ''}`}
                        />
                        {l.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}