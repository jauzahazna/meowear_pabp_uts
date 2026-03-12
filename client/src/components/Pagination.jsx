import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
// Gunakan icon panah agar terlihat lebih mewah
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 

const Pagination = () => {
  const { pagination } = useLoaderData();
  const { page, totalPage } = pagination;
  const navigate = useNavigate(); // Standar penamaan biasanya 'navigate'
  const { search, pathname } = useLocation();

  // UX Plus: Jika total halaman hanya 1 atau kosong, sembunyikan pagination-nya
  if (totalPage < 2) return null;

  const handlePageChange = (number) => {
    // Mencegah klik ke halaman yang tidak ada (kurang dari 1 atau lebih dari total)
    if (number < 1 || number > totalPage) return; 

    const searchParams = new URLSearchParams(search);
    searchParams.set("page", number);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10 mb-8">
      
      {/* --- TOMBOL PREVIOUS --- */}
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="btn btn-square btn-outline border-base-300 rounded-none hover:bg-neutral hover:text-neutral-content disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-base-content transition-all duration-300"
      >
        <FaChevronLeft className="text-sm" />
      </button>

      {/* --- NOMOR HALAMAN --- */}
      <div className="join rounded-none border border-base-300">
        {pages.map((pageNumber) => {
          const isActive = pageNumber === page;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`join-item btn min-w-[3rem] rounded-none border-none transition-all duration-300 font-bold ${
                isActive 
                  ? "bg-neutral text-neutral-content hover:bg-neutral/90" 
                  : "bg-transparent hover:bg-base-200 text-base-content"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* --- TOMBOL NEXT --- */}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPage}
        className="btn btn-square btn-outline border-base-300 rounded-none hover:bg-neutral hover:text-neutral-content disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-base-content transition-all duration-300"
      >
        <FaChevronRight className="text-sm" />
      </button>
      
    </div>
  );
};

export default Pagination;