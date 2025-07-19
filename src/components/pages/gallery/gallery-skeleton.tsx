
const GallerySkeleton = () => {
  // Create an array of 8 items for the skeleton grid
  const skeletonItems = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 2xl:grid-cols-4">
      {skeletonItems.map((item) => (
        <div key={item} className="flex justify-center">
          <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm sm:w-[400px]">
            {/* Image skeleton */}
            <div className="relative h-48 w-full overflow-hidden bg-gradient-to-r from-gray-700 to-gray-500 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer"></div>
            </div>

            {/* Content skeleton */}
            <div className="flex flex-grow flex-col space-y-4 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                {/* Title skeleton */}
                <div className="h-6 w-24 rounded bg-gray-500 animate-pulse"></div>
                {/* Date skeleton */}
                <div className="h-4 w-16 rounded bg-gray-500 animate-pulse"></div>
              </div>

              {/* Description skeleton */}
              <div className="h-4 w-3/4 rounded bg-gray-500 animate-pulse"></div>
              <div className="h-4 w-1/2 rounded bg-gray-500 animate-pulse"></div>

              {/* Tags skeleton */}
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 rounded-full bg-gray-500 animate-pulse"></div>
                <div className="h-6 w-20 rounded-full bg-gray-500 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GallerySkeleton;
