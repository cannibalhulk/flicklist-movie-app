import { MovieReviewResultType } from "../types/MovieReviewType"
import {Avatar, ScrollShadow} from "@nextui-org/react"

function ReviewDetails(params : MovieReviewResultType) {
    const username_clipped = params.author_details.username.slice(0,2).toUpperCase();
  return (
    <div className="flex justify-between items-start rounded-xl bg-zinc-600/50 p-2">
        <div className="flex flex-col h-full justify-between">
            <Avatar size="md" className="text-[18px]"  radius="lg" name={username_clipped}/>
            <p className="text-white/50 font-lexendMd">{params.created_at.slice(0,10)}</p>
        </div>
        <ScrollShadow hideScrollBar className="w-[600px] h-36 px-3 overflow-y-scroll">
            <p>{params.content}</p> {/*displaying review content */}
        </ScrollShadow>
    </div>
  )
}

export default ReviewDetails