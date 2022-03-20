import {SQLDataSource} from "datasource-sql"
import {Author, Book, Series, Tag} from "../models/Book"

export class BooksSource extends SQLDataSource {
  async getBooks(
    filterAuthors?: string[],
    filterSeries?: string[],
    filterTags?: string[]
  ): Promise<Book[]> {
    let books = this.knex.select("*").from("books")
    if (filterAuthors && filterAuthors.length !== 0) {
      books = books.whereIn("author_sort", filterAuthors)
    }
    if (filterSeries && filterSeries.length !== 0) {
      console.log(filterSeries)
      const seriesIds = await Promise.all(
        filterSeries.map(async (s) => await this.getSeriesIdFromName(s))
      )
      const bookIdsWithSeries = (
        await Promise.all(seriesIds.map(async (sid) => await this.getBookIdsForSeriesId(sid)))
      ).flat()
      console.log(filterSeries, seriesIds, bookIdsWithSeries)
      books = books.whereIn("id", bookIdsWithSeries)
    }
    if (filterTags && filterTags.length !== 0) {
      const tagIds = await Promise.all(filterTags.map(async (t) => await this.getTagIdFromName(t)))
      const bookIdsWithTags = (
        await Promise.all(tagIds.map(async (tid) => await this.getBookIdsForTagId(tid)))
      ).flat()
      books = books.whereIn("id", bookIdsWithTags)
    }
    return books
  }

  async getSeries(): Promise<Series[]> {
    return this.knex.select("*").from("series")
  }

  async getSeriesIdFromName(seriesName: string): Promise<number> {
    return (await this.knex.select("id").from("series").where("name", seriesName))[0].id
  }

  async getAuthors(): Promise<Author[]> {
    return this.knex.select("*").from("authors")
  }

  async getTags(): Promise<Tag[]> {
    return this.knex.select("*").from("tags")
  }

  async getTagIdFromName(tagName: string): Promise<number> {
    return (await this.knex.select("id").from("tags").where("name", tagName))[0].id
  }

  async getBookIdsForSeriesId(seriesId: number): Promise<number[]> {
    const temp = await this.knex.select("book").from("books_series_link").where("series", seriesId)
    console.log("bookIds from Series id", seriesId, temp)
    return temp.map((res) => res.book)
  }

  async getBookIdsForTagId(tagId: number): Promise<number[]> {
    return (await this.knex.select("book").from("books_tags_link").where("tag", tagId)).map(
      (res) => res.book
    )
  }

  async getFilenameForBook(bookNumber: number): Promise<{format: string; name: string}> {
    return (
      await this.knex.select("format", "name").from("data").where({book: bookNumber}).limit(1)
    )[0]
  }
}
