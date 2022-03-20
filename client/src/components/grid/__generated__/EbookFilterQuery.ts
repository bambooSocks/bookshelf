/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EbookFilterQuery
// ====================================================

export interface EbookFilterQuery_ebook_series {
  __typename: "Series";
  id: number;
  name: string;
}

export interface EbookFilterQuery_ebook_authors {
  __typename: "Author";
  id: number;
  name: string;
  sort: string;
}

export interface EbookFilterQuery_ebook_tags {
  __typename: "Tag";
  id: number;
  name: string;
}

export interface EbookFilterQuery {
  ebook_series: EbookFilterQuery_ebook_series[];
  ebook_authors: EbookFilterQuery_ebook_authors[];
  ebook_tags: EbookFilterQuery_ebook_tags[];
}
