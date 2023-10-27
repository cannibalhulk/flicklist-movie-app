import React from 'react'
import { Skeleton } from '@nextui-org/react'

function SkeletonUi() {
  return (
    <div className='flexs'>
        <div className="flex flex-col items-center space-y-5 mr-10">
            <Skeleton disableAnimation={false} className='bg-white/30 rounded-lg'>
                <div className='w-[300px] h-[500px] rounded-lg'></div>
            </Skeleton>

            <Skeleton>
                <div className='min-w-1/4 h-[40px] '></div>
            </Skeleton>
        </div>
    </div>
  )
}

export default SkeletonUi