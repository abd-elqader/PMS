import React, { useState } from 'react'

const usePagination = () => {
      const [title, setTitle] = useState<string>("");
      const [pageNumber, setPageNumber] = useState<number>(1);
      const [pageSize, setPageSize] = useState<number>(8);
      const [totalPages, setTotalPages] = useState<number>(1);

      const handleTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
          setPageNumber(1); 
        };
      
        const handleNext = () => {
          const total= Math.ceil(totalPages / pageSize);
          if (pageNumber < total) {
            setPageNumber((prev) => prev + 1);
          }
        };
      
        const handlePrev = () => {
          if (pageNumber > 1) {
            setPageNumber((prev) => prev - 1);
          }
        };
      
        const handlePageSizeChange = (newSize: number) => {
          setPageSize(newSize);
          setPageNumber(1); 
        };
      
        
  return {title, pageNumber,setPageNumber, pageSize,totalPages,handleTitleValue,handleNext,handlePrev,handlePageSizeChange ,setTotalPages}
}

export default usePagination