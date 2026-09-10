'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import type { CourseDifficulty, LearningType } from '@/lib/types/course'
import {
  COURSE_CATEGORIES,
  DIFFICULTY_LABELS,
  LEARNING_TYPE_LABELS,
} from '@/lib/types/course'

export function CourseFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const search = searchParams.get('search') ?? ''
  const category = searchParams.get('category') ?? ''
  const difficulty = searchParams.get('difficulty') ?? ''
  const learningType = searchParams.get('learning_type') ?? ''

  const [searchInput, setSearchInput] = useState(search)

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })

      const query = params.toString()
      startTransition(() => {
        router.push(query ? `/courses?${query}` : '/courses')
      })
    },
    [router, searchParams]
  )

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (searchInput !== search) {
        updateParams({ search: searchInput })
      }
    }, 300)

    return () => window.clearTimeout(timer)
  }, [searchInput, search, updateParams])

  return (
    <div className="min-w-0 space-y-4">
      <div>
        <label htmlFor="course-search" className="sr-only">
          Search courses
        </label>
        <input
          id="course-search"
          type="search"
          placeholder="Search courses, topics, or instructors..."
          value={searchInput}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm shadow-sm placeholder:text-gray-400 focus:border-brand focus:outline-none"
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterPill
            active={!category}
            onClick={() => updateParams({ category: '' })}
            disabled={isPending}
          >
            All Courses
          </FilterPill>
          {Object.entries(COURSE_CATEGORIES).map(([value, label]) => (
            <FilterPill
              key={value}
              active={category === value}
              onClick={() => updateParams({ category: value })}
              disabled={isPending}
            >
              {label}
            </FilterPill>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div>
            <label htmlFor="difficulty-filter" className="sr-only">
              Filter by difficulty
            </label>
            <select
              id="difficulty-filter"
              value={difficulty}
              onChange={(event) =>
                updateParams({ difficulty: event.target.value })
              }
              disabled={isPending}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm shadow-sm focus:border-brand focus:outline-none lg:w-auto"
            >
              <option value="">All Difficulties</option>
              {(
                Object.entries(DIFFICULTY_LABELS) as [CourseDifficulty, string][]
              ).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="learning-type-filter" className="sr-only">
              Filter by learning type
            </label>
            <select
              id="learning-type-filter"
              value={learningType}
              onChange={(event) =>
                updateParams({ learning_type: event.target.value })
              }
              disabled={isPending}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm shadow-sm focus:border-brand focus:outline-none lg:w-auto"
            >
              <option value="">All Formats</option>
              {(
                Object.entries(LEARNING_TYPE_LABELS) as [LearningType, string][]
              ).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterPill({
  children,
  active,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
        active
          ? 'border-brand bg-brand-light text-brand-dark'
          : 'border-border bg-surface text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  )
}
