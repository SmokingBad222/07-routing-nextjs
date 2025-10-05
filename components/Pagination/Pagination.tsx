'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

export interface PaginationProps {
  pageCount: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export default function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      className={css.pagination}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={(e) => onPageChange(e.selected + 1)}
    />
  );
}
