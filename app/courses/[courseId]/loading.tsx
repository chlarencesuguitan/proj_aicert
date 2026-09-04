import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Container } from '@/components/ui/Container'

export default function CourseDetailLoading() {
  return (
    <>
      <Navbar />
      <main className="py-10 sm:py-14">
        <Container>
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-40 rounded bg-gray-200" />
            <div className="h-12 w-2/3 max-w-xl rounded bg-gray-200" />
            <div className="h-24 w-full max-w-3xl rounded bg-gray-100" />
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="h-80 rounded-3xl bg-gray-100" />
              <div className="h-80 rounded-3xl bg-gray-100" />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
