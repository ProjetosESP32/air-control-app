export interface Paginate<T> {
  data: T[]
  meta: {
    currentPage: number
    perPage: number
    firstPage: number
    firstPageUrl: string
    lastPage: number
    lastPageUrl: string
    nextPageUrl: string | null
    previousPageUrl: string | null
    total: number
  }
}
