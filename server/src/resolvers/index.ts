import {BooksSource} from "../datasources/booksSource"
import {
  getAuthors as getEbookAuthors,
  getBooks as getEbooks,
  getSeries as getEbookSeries,
  getTags as getEbookTags
} from "./ebooks"
import {
  getAuthors as getAudiobookAuthors,
  getBooks as getAudiobooks,
  getSeries as getAudiobookSeries,
  getTags as getAudiobookTags
} from "./audiobooks"

export interface CustomDataSources {
  ebooksSource: BooksSource
  audiobooksSource: BooksSource
}

export interface CustomeResolversContext {
  dataSources: CustomDataSources
}

export const resolvers = {
  Query: {
    ebooks: getEbooks,
    ebook_series: getEbookSeries,
    ebook_authors: getEbookAuthors,
    ebook_tags: getEbookTags,
    audiobooks: getAudiobooks,
    audiobook_series: getAudiobookSeries,
    audiobook_authors: getAudiobookAuthors,
    audiobook_tags: getAudiobookTags
  }
}
