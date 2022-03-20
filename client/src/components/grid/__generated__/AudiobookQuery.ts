/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AudiobookQuery
// ====================================================

export interface AudiobookQuery_audiobooks {
  __typename: "Book";
  id: number;
  title: string;
  series_index: number;
  author_sort: string;
  cover_path: string;
  file_path: string;
}

export interface AudiobookQuery {
  audiobooks: AudiobookQuery_audiobooks[];
}

export interface AudiobookQueryVariables {
  authors?: string[] | null;
  series?: string[] | null;
  tags?: string[] | null;
}
