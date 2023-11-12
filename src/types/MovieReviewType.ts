type AuthorDetails = {
    name: string,
    username: string,
    avatar_path: string,
    rating: string
}

export type MovieReviewResultType = {
    author: string
    author_details: AuthorDetails
    content: string
    created_at: string
    id: string
    updated_at: string
    url: string
}

export type MovieReviewType = {
    id:number
    page: number
    results: MovieReviewResultType[]
    total_pages: number
    total_results: number
}