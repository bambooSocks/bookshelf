/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AudiobookFilterQuery
// ====================================================

export interface AudiobookFilterQuery_audiobook_series {
  __typename: "Series";
  id: number;
  name: string;
}

export interface AudiobookFilterQuery_audiobook_authors {
  __typename: "Author";
  id: number;
  name: string;
  sort: string;
}

export interface AudiobookFilterQuery_audiobook_tags {
  __typename: "Tag";
  id: number;
  name: string;
}

export interface AudiobookFilterQuery {
  audiobook_series: AudiobookFilterQuery_audiobook_series[];
  audiobook_authors: AudiobookFilterQuery_audiobook_authors[];
  audiobook_tags: AudiobookFilterQuery_audiobook_tags[];
}
