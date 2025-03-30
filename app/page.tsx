import { Suspense } from "react"
import ProjectGrid from "@/components/project-grid"
import AboutMe from "@/components/about-me"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-10">
        <AboutMe />

        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">My GitHub Projects</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              A showcase of my personal projects and contributions.
            </p>
          </div>
          <Suspense fallback={<ProjectGridSkeleton />}>
            <ProjectGrid />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

function ProjectGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow">
            <Skeleton className="h-[200px] w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

