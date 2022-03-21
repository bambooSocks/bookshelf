import React, {useState} from "react"
import {Button, Empty, PageHeader, Select, Spin, Tooltip} from "antd"
import {BookGrid} from "./BookGrid"
import {useMediaQuery} from "react-responsive"
import {gql, useQuery} from "@apollo/client"
import {DeleteOutlined} from "@ant-design/icons"
import {AudiobookQuery, AudiobookQueryVariables} from "./__generated__/AudiobookQuery"
import {AudiobookFilterQuery} from "./__generated__/AudiobookFilterQuery"
import styled from "styled-components"
import {AudiobookCard} from "./AudiobookCard"
import {useLocalStorage} from "../helper/useLocalStorage"

const {Option} = Select

const routes = [
  {
    path: "index",
    breadcrumbName: "Home"
  },
  {
    path: "first",
    breadcrumbName: "Audiobooks"
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

export const AudioBookGrid: React.FC = () => {
  const [authorsFilter, setAuthorsFilter] = useState<string[]>([])
  const [seriesFilter, setSeriesFilter] = useState<string[]>([])
  const [tagsFilter, setTagsFilter] = useState<string[]>([])
  const [favourite, setFavourite] = useLocalStorage("audiobooks_favourite", [])

  const isLargeScreen = useMediaQuery({query: "only screen and (min-width: 768px)"})

  const {data: bookData, loading: bookLoading} = useQuery<AudiobookQuery, AudiobookQueryVariables>(
    AUDIOBOOK_QUERY,
    {
      variables: {authors: authorsFilter, series: seriesFilter, tags: tagsFilter}
    }
  )
  const {data: filterData, loading: filterLoading} =
    useQuery<AudiobookFilterQuery>(AUDIOBOOK_FILTER_QUERY)

  const clearFilters = () => {
    setAuthorsFilter([])
    setSeriesFilter([])
    setTagsFilter([])
  }

  return (
    <>
      <PageHeader className="site-page-header-responsive" title="Audiobooks" breadcrumb={{routes}}>
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
              {filterData && filterData.audiobook_authors
                ? filterData.audiobook_authors.map((author) => (
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
              {filterData && filterData.audiobook_series
                ? filterData.audiobook_series.map((series) => (
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
              {filterData && filterData.audiobook_tags
                ? filterData.audiobook_tags.map((tag) => <Option key={tag.name}>{tag.name}</Option>)
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
          {bookData && bookData?.audiobooks ? (
            bookData.audiobooks.map((book) => (
              <AudiobookCard
                title={book.title}
                author={book.author_sort}
                cover={book.cover_path}
                filename={book.file_path}
              />
            ))
          ) : (
            <Empty />
          )}
        </BookGrid>
      </Spin>
    </>
  )
}

const AUDIOBOOK_QUERY = gql`
  query AudiobookQuery($authors: [String!], $series: [String!], $tags: [String!]) {
    audiobooks(authors: $authors, series: $series, tags: $tags) {
      id
      title
      series_index
      author_sort
      cover_path
      file_path
    }
  }
`

const AUDIOBOOK_FILTER_QUERY = gql`
  query AudiobookFilterQuery {
    audiobook_series {
      id
      name
    }
    audiobook_authors {
      id
      name
      sort
    }
    audiobook_tags {
      id
      name
    }
  }
`
