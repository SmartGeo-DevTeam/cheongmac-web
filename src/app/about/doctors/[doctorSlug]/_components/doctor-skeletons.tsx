import { Skeleton } from '@/_shadcn/ui/skeleton';

export function DoctorProfileSkeleton() {
  return (
    <div className="bg-[#F5F6F8] py-5 xl:py-10">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-5 xl:grid-cols-2 xl:gap-12">
        <Skeleton className="aspect-335/300 w-full rounded-xl" />
        <div className="space-y-5">
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function DoctorScheduleSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5">
      <Skeleton className="h-44 w-full rounded-xl" />
      <Skeleton className="mt-3 h-10 w-3/4" />
    </div>
  );
}

export function DoctorCardsSkeleton() {
  return (
    <div className="mx-auto mt-10 w-full max-w-7xl px-5 xl:mt-15">
      <Skeleton className="h-8 w-32" />
      <div className="mt-5 grid grid-cols-1 gap-3 xl:ml-80 xl:grid-cols-3 xl:gap-5">
        <Skeleton className="aspect-square rounded-2xl" />
        <Skeleton className="hidden aspect-square rounded-2xl xl:block" />
        <Skeleton className="hidden aspect-square rounded-2xl xl:block" />
      </div>
    </div>
  );
}

export function DoctorListSkeleton() {
  return (
    <div className="mx-auto mt-10 w-full max-w-7xl px-5 xl:mt-15">
      <Skeleton className="h-8 w-40" />
      <div className="mt-5 space-y-3">
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
      </div>
    </div>
  );
}
