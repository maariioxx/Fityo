const Skeleton = ({ className }: { className: string }) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gray-300 leading-none">
      ‌
    </span>
    <br />
  </div>
);

const SVGSkeleton = ({ className }: { className: string }) => (
  <svg className={className + ' animate-pulse rounded bg-gray-300'} />
);

export function CaloriesLoadingSkeleton() {
  return (
    <>
      <SVGSkeleton className="w-[200px] h-[200px]" />
    </>
  );
}

export function CarbosLoadingSkeleton() {
  return (
    <>
      <div>
        <Skeleton className="w-[208px] max-w-full" />
        <div>
          <div className="w-full h-2.5">
            <div className="leading-none space-x-2 bg-yellow-400 animate-pulse rounded h-2.5"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export function FatsLoadingSkeleton() {
  return (
    <>
      <div>
        <Skeleton className="w-[208px] max-w-full" />
        <div>
          <div className="w-full h-2.5">
            <div className="leading-none space-x-2 bg-purple-600 animate-pulse rounded h-2.5"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ProteinLoadingSkeleton() {
  return (
    <>
      <div>
        <Skeleton className="w-[208px] max-w-full" />
        <div>
          <div className="w-full h-2.5">
            <div className="leading-none space-x-2 bg-red-600 animate-pulse rounded h-2.5"></div>
          </div>
        </div>
      </div>
    </>
  );
}
