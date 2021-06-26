export default class Pageable<T> {
  constructor(
    public page: number,
    public page_size: number,
    public total_pages: number,
    public data: T[]
  ) {}
}
