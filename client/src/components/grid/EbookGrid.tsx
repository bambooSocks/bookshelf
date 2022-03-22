import React, {useEffect, useState} from "react"
import {Button, Empty, PageHeader, Select, Spin, Tooltip} from "antd"
import {BookGrid} from "./BookGrid"
import {EbookCard} from "./EbookCard"
import {gql, useQuery} from "@apollo/client"
import {EbookQuery, EbookQueryVariables, EbookQuery_ebooks} from "./__generated__/EbookQuery"
import styled from "styled-components"
import {DeleteOutlined} from "@ant-design/icons"
import {useMediaQuery} from "react-responsive"
import {EbookFilterQuery} from "./__generated__/EbookFilterQuery"

const {Option} = Select

const routes = [
  {
    path: "index",
    breadcrumbName: "Home"
  },
  {
    path: "first",
    breadcrumbName: "E-books"
  }
]

const FilterFields = styled(Select)`
  @media only screen and (min-width: 768px) {
    width: 30%;
  }
  width: 100%;
`

const FilterContainer = styled.div`
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
  flex-direction: column;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-around;
`

export const EbookGrid: React.FC = () => {
  const [authorsFilter, setAuthorsFilter] = useState<string[]>([])
  const [seriesFilter, setSeriesFilter] = useState<string[]>([])
  const [tagsFilter, setTagsFilter] = useState<string[]>([])
  const [favourite, setFavourite] = useState<number[]>(() => {
    const saved = localStorage.getItem("ebooks_favourite")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("ebooks_favourite", JSON.stringify(favourite))
  }, [favourite])

  const generateEbookCard = (book: EbookQuery_ebooks) => (
    <EbookCard
      title={book.title}
      author={book.author_sort}
      cover={book.cover_path}
      filename={book.file_path}
      favourite={favourite.includes(book.id)}
      onFavourite={() =>
        setFavourite((old) =>
          old.includes(book.id) ? old.filter((n) => n !== book.id) : [...old, book.id]
        )
      }
    />
  )

  const isLargeScreen = useMediaQuery({query: "only screen and (min-width: 768px)"})

  const {data: bookData, loading: bookLoading} = useQuery<EbookQuery, EbookQueryVariables>(
    EBOOK_QUERY,
    {variables: {authors: authorsFilter, series: seriesFilter, tags: tagsFilter}}
  )
  const {data: filterData, loading: filterLoading} = useQuery<EbookFilterQuery>(EBOOK_FILTER_QUERY)

  const clearFilters = () => {
    setAuthorsFilter([])
    setSeriesFilter([])
    setTagsFilter([])
  }

  return (
    <>
      <PageHeader className="site-page-header-responsive" title="E-books" breadcrumb={{routes}}>
        <Spin spinning={filterLoading} size="large">
          <FilterContainer>
            <FilterFields
              mode="multiple"
              allowClear
              showSearch
              placeholder="Filter by Author"
              value={authorsFilter}
              onChange={(value) => setAuthorsFilter(value as string[])}
            >
              {filterData && filterData.ebook_authors
                ? filterData.ebook_authors.map((author) => (
                    <Option key={author.sort}>{author.sort}</Option>
                  ))
                : []}
            </FilterFields>
            <FilterFields
              mode="multiple"
              allowClear
              showSearch
              placeholder="Filter by Series"
              value={seriesFilter}
              onChange={(value) => setSeriesFilter(value as string[])}
            >
              {filterData && filterData.ebook_series
                ? filterData.ebook_series.map((series) => (
                    <Option key={series.name}>{series.name}</Option>
                  ))
                : []}
            </FilterFields>
            <FilterFields
              mode="multiple"
              allowClear
              showSearch
              placeholder="Filter by Tags"
              value={tagsFilter}
              onChange={(value) => setTagsFilter(value as string[])}
            >
              {filterData && filterData.ebook_tags
                ? filterData.ebook_tags.map((tag) => <Option key={tag.name}>{tag.name}</Option>)
                : []}
            </FilterFields>
            {isLargeScreen ? (
              <Tooltip placement="bottom" title="Clear filters">
                <Button
                  icon={<DeleteOutlined />}
                  shape="circle"
                  type="ghost"
                  onClick={() => clearFilters()}
                />
              </Tooltip>
            ) : (
              <Button
                icon={<DeleteOutlined />}
                shape="round"
                type="ghost"
                style={{width: "150px"}}
                onClick={() => clearFilters()}
              >
                Clear filters
              </Button>
            )}
          </FilterContainer>
        </Spin>
      </PageHeader>
      <Spin spinning={bookLoading} size="large">
        <BookGrid>
          {bookData && bookData?.ebooks ? (
            <>
              {bookData.ebooks.filter((b) => favourite.includes(b.id)).map(generateEbookCard)}
              {bookData.ebooks.filter((b) => !favourite.includes(b.id)).map(generateEbookCard)}
            </>
          ) : (
            <Empty />
          )}
        </BookGrid>
      </Spin>
    </>
  )
}

const EBOOK_QUERY = gql`
  query EbookQuery($authors: [String!], $series: [String!], $tags: [String!]) {
    ebooks(authors: $authors, series: $series, tags: $tags) {
      id
      title
      series_index
      author_sort
      cover_path
      file_path
    }
  }
`

const EBOOK_FILTER_QUERY = gql`
  query EbookFilterQuery {
    ebook_series {
      id
      name
    }
    ebook_authors {
      id
      name
      sort
    }
    ebook_tags {
      id
      name
    }
  }
`
