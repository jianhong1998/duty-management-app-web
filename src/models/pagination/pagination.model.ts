export default interface IPagination {
    totalPages: number;
    pageSize: number;
    totalRecords: number;
    currentPage: number;
    prevPage: number | null;
    nextPage: number | null;
}
