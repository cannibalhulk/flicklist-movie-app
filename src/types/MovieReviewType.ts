type AuthorDetails = {
    name: string,
    username: string,
    avatar_path: string,
    rating: string
}

export interface MovieReviewResultType {
    author: string
    author_details: AuthorDetails
    content: string
    created_at: string
    id: string
    updated_at: string
    url: string
}

export interface MovieReviewType {
    id:number
    page: number
    results: MovieReviewResultType[]
    total_pages: number
    total_results: number
}