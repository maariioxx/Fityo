import {
  CaloriesLoadingSkeleton,
  CarbosLoadingSkeleton,
  FatsLoadingSkeleton,
  ProteinLoadingSkeleton,
} from '../components/nutrition/summary/Skeletons';

export default function Loading() {
  return (
    <div className="bg-slate-50 dark:bg-zinc-950 w-screen min-h-screen mt-20 rounded-t-[100px] flex flex-col items-center py-10 gap-16">
      <div className="text-4xl animate-pulse h-10 bg-gray-200 rounded w-1/4"></div>
      <div className="flex flex-col items-center gap-4 w-screen">
        <div className="flex gap-4 items-center animate-pulse">
          <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="space-y-14">
          <div className="grid lg:grid-cols-2 lg:gap-10 justify-center">
            <CaloriesLoadingSkeleton />

            <div className="flex flex-col gap-7 -mt-2 lg:pt-3">
              <CarbosLoadingSkeleton />

              <FatsLoadingSkeleton />

              <ProteinLoadingSkeleton />
            </div>
          </div>
          <div className="w-[99%] lg:w-[700px] flex flex-col items-center">
            <div
              role="status"
              className="w-[700px] p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
