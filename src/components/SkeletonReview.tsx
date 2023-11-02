import { Skeleton } from "@nextui-org/react";
export default function SkeletonReview() {
  return (
    <div className="p-3 h-full flex flex-col space-y-5 overflow-x-auto overflow-y-scroll">
        <div className="flex flex-col h-full justify-between">
            <Skeleton disableAnimation={false} className="bg-white/30 rounded-lg">
                <div className="w-[20px] h-[20px] rounded-md bg-secondary-600"></div>
            </Skeleton>

        </div>
    </div>
  );
}
