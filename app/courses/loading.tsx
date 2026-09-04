import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Container } from '@/components/ui/Container'

export default function CoursesLoading() {
  return (
    <>
      <Navbar />
      <main className="py-10 sm:py-14">
        <Container>
          <div className="animate-pulse space-y-6">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-10 w-2/3 max-w-lg rounded bg-gray-200" />
            <div className="h-16 rounded-2xl bg-gray-100" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-96 rounded-2xl border border-border bg-gray-100"
                />
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
