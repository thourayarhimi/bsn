/* tslint:disable */
/* eslint-disable */
export interface BorrowedBookResponse {
  authorName?: string;
  id?: number;
  isbn?: string;
  borrowedBy?:string;
  ownedBy?:string;
  rate?: number;
  returnApproved?: boolean;
  returned?: boolean;
  title?: string;
}
