import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Container } from '@/components/ui/Container'

export default function CourseDetailLoading() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden py-10 sm:py-14">
        <Container>
          <div className="animate-pulse space-y-8">
            <div className="h-4 w-36 rounded bg-gray-200" />
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div className="h-6 w-48 rounded bg-gray-200" />
                <div className="h-12 w-full max-w-xl rounded bg-gray-200" />
                <div className="h-28 w-full max-w-3xl rounded bg-gray-100" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="h-20 rounded-2xl bg-gray-100" />
                  <div className="h-20 rounded-2xl bg-gray-100" />
                  <div className="h-20 rounded-2xl bg-gray-100" />
                </div>
              </div>
              <div className="h-80 rounded-2xl bg-gray-100" />
            </div>
            <div className="h-64 rounded-2xl bg-gray-100" />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
