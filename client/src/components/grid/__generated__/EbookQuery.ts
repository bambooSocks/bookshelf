/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EbookQuery
// ====================================================

export interface EbookQuery_ebooks {
  __typename: "Book";
  id: number;
  title: string;
  series_index: number;
  author_sort: string;
  cover_path: string;
  file_path: string;
}

export interface EbookQuery {
  ebooks: EbookQuery_ebooks[];
}

export interface EbookQueryVariables {
  authors?: string[] | null;
  series?: string[] | null;
  tags?: string[] | null;
}
