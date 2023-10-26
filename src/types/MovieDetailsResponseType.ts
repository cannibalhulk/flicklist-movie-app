type Genres = {
    id: number
    name: string
}

type Companies = {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

type Countries = {
    iso_3166_1: string
    name: string
}

type Languages = {
    english_name: string
    iso_639_1: string
    name: string
}

export interface MovieDetailsResponseType {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: string
    budget: number
    genres: Genres[]
    homepage: string
    id: number
    imdb_id: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies:Companies[]
    production_countries: Countries[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: Languages[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}