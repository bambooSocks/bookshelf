import {CustomeResolversContext} from "."
import {Author, Book, Series, Tag} from "../models/Book"

const populateBook = async (b: Book, context: CustomeResolversContext): Promise<Book> => {
  b.cover_path = "audiobooks/" + b.path + "/cover.jpg"
  const filename = await context.dataSources.audiobooksSource.getFilenameForBook(b.id)
  b.file_path = "audiobooks/" + b.path + "/" + filename.name + `.${filename.format.toLowerCase()}`
  return b
}

export const getBooks = async (
  _src: unknown,
  {authors, series, tags}: {authors?: string[]; series?: string[]; tags?: string[]},
  context: CustomeResolversContext
): Promise<Book[]> => {
  const books = await context.dataSources.audiobooksSource.getBooks(authors, series, tags)
  await Promise.all(books.map(async (book) => await populateBook(book, context)))
  return books
}

export const getSeries = async (
  _src: unknown,
  _args: unknown,
  context: CustomeResolversContext
): Promise<Series[]> => {
  return context.dataSources.audiobooksSource.getSeries()
}

export const getAuthors = async (
  _src: unknown,
  _args: unknown,
  context: CustomeResolversContext
): Promise<Author[]> => {
  return context.dataSources.audiobooksSource.getAuthors()
}

export const getTags = async (
  _src: unknown,
  _args: unknown,
  context: CustomeResolversContext
): Promise<Tag[]> => {
  return context.dataSources.audiobooksSource.getTags()
}
