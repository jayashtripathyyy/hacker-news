import React from 'react'
import { useStore } from '../../store/global';

type Props = {}

type SearchPageSizeProps = {
    pageSize: number;
    setPageSize: (pageSize: number) => void;
}

function SearchController({ }: Props) {
    const { itemsPerPage, setItemsPerPage } = useStore();
    return (
        <div className='border-b border-dashed border-border '>
            <div className='container_wrapper p-1 px-6 flex items-center justify-between'>
                <div className='text-xs  font-semibold text-primary'>5 results</div>
                <SearchPageSize pageSize={itemsPerPage} setPageSize={setItemsPerPage} />
            </div>
        </div>
    )
}

function SearchPageSize({ pageSize, setPageSize }: SearchPageSizeProps) {
    return (
        <div className="flex items-center gap-2">
            <label className="text-xs text-muted-foreground">Show:</label>
            <select className="h-6  rounded-lg border border-border bg-muted px-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    )
}

export default SearchController