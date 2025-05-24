import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UsePaginationProps {
  totalItems: number;
  defaultItemsPerPage?: number;
  pageParamName?: string;
  sizeParamName?: string;
}

export const usePagination = ({ 
  totalItems, 
  defaultItemsPerPage = 10, 
  pageParamName = 'page',
  sizeParamName = 'size'
}: UsePaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Initialize page and size from URL on mount
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get(pageParamName) || '1', 10);
    const sizeFromUrl = parseInt(searchParams.get(sizeParamName) || defaultItemsPerPage.toString(), 10);
    
    const validPage = Math.max(1, Math.min(pageFromUrl, Math.ceil(totalItems / sizeFromUrl)));
    const validSize = Math.max(5, Math.min(sizeFromUrl, 100)); // Min 5, Max 100
    
    setCurrentPage(validPage);
    setItemsPerPage(validSize);
  }, [searchParams, pageParamName, sizeParamName, defaultItemsPerPage, totalItems]);
  
  const updateURL = useCallback((page: number, size: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (page === 1) {
      params.delete(pageParamName);
    } else {
      params.set(pageParamName, page.toString());
    }
    
    if (size === defaultItemsPerPage) {
      params.delete(sizeParamName);
    } else {
      params.set(sizeParamName, size.toString());
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.push(newUrl, { scroll: false });
  }, [router, searchParams, pageParamName, sizeParamName, defaultItemsPerPage]);
  
  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
    updateURL(validPage, itemsPerPage);
  }, [totalPages, updateURL, itemsPerPage]);
  
  const changePageSize = useCallback((size: number) => {
    const validSize = Math.max(5, Math.min(size, 100));
    const newTotalPages = Math.ceil(totalItems / validSize);
    const newPage = Math.max(1, Math.min(currentPage, newTotalPages));
    
    setItemsPerPage(validSize);
    setCurrentPage(newPage);
    updateURL(newPage, validSize);
  }, [totalItems, currentPage, updateURL]);
  
  const getPaginatedData = useCallback(<T>(data: T[]): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);
  
  return {
    currentPage,
    totalPages,
    itemsPerPage,
    goToPage,
    changePageSize,
    getPaginatedData
  };
}; 