import { Skeleton } from '@nextui-org/react'

function SkeletonUi() {
  return (
    <div className='flex'>
        <div className="flex flex-col items-center space-y-5 mr-10">
            <Skeleton disableAnimation={false} className='bg-white/30 rounded-lg'>
                <div className='w-[300px] h-[500px] rounded-lg'></div>
            </Skeleton>

            <Skeleton disableAnimation={false} className='bg-white/30 rounded-lg'>
                <div className='min-w-[100px] h-[40px] '></div>
            </Skeleton>
        </div>

        <div className=" flex flex-col justify-between space-y-4">
          <div className="flex flex-col space-y-7">
            <Skeleton disableAnimation={false} className='bg-white/30 rounded-lg'>
                <div className='min-w-[400px] h-[30px] '></div>
            </Skeleton>

            <Skeleton disableAnimation={false} className='bg-white/30 rounded-lg'>
                <div className='min-w-[200px] h-[80px]'></div>
            </Skeleton>

            <div className="flex">
              <Skeleton disableAnimation={false} className='mr-5 bg-white/20 rounded-xl'>
                  <div className='min-w-[90px] h-[20px] '></div>
              </Skeleton>
              <Skeleton disableAnimation={false} className='mr-5 bg-white/20 rounded-xl'>
                  <div className='min-w-[90px] h-[20px] '></div>
              </Skeleton>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SkeletonUi