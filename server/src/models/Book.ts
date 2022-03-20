export interface Book {
  id: number
  title: string
  pubdate: Date
  series_index: number
  author_sort: string
  path: string
  cover_path: string
  file_path: string
  has_cover: boolean
}

export interface Series {
  id: number
  name: string
}

export interface Author {
  id: number
  name: string
  sort: string
}

export interface Tag {
  id: number
  name: string
}
