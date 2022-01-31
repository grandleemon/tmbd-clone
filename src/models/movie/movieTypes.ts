export type MovieDetailsTypes = {
    backdrop_path: string | null,
    title: string, 
    poster_path: string, 
    release_date: string, 
    adult: boolean,
    production_countries: [
        {iso_3166_1: string}
    ]
    genres: [],
    runtime: number, 
    vote_average?: number, 
    overview: string,
    homepage: string,
    status: string,
    original_language: string,
    budget: number,
    revenue: number
}