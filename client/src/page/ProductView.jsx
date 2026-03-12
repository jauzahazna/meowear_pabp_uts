import React, { useEffect, useRef } from "react";
import customAPI from "../api";
import { useLoaderData, Link } from "react-router-dom";
import Filter from "../components/Filter";
import CartProduct from "../components/CartProduct";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";

// --- Tech Stack Imports ---
import { animate, createScope } from "animejs";
import { FaPlus } from "react-icons/fa";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await customAPI.get("/product", { params: params });

  const products = data.data;
  const pagination = data.pagination;

  return { products, params, pagination };
};

const ProductView = () => {
  const user = useSelector((state) => state.userState.user);
  const { products, pagination } = useLoaderData();
  
  // Refs required for Anime.js v4 scoping
  const rootRef = useRef(null);
  const scope = useRef(null);

  // --- Anime.js v4 Animation Logic ---
  // Animasi akan jalan ulang setiap kali array 'products' berubah (misal saat search/filter)
  useEffect(() => {
    if (products && products.length > 0) {
      scope.current = createScope({ root: rootRef }).add(() => {
        animate('.product-card', {
          y: [40, 0],         // Muncul dari bawah
          opacity: [0, 1],    // Dari transparan ke jelas
          duration: 800,
          delay: (_, i) => i * 150, // Efek berurutan (stagger)
          ease: 'out(4)'      
        });
      });
    }

    // Cleanup untuk mencegah bentrok memori animasi
    return () => {
      if (scope.current) scope.current.revert();
    };
  }, [products]);

  return (
    <div ref={rootRef} className="container mx-auto px-4 py-8 max-w-7xl">
      
      {/* Header Halaman */}
      <div className="mb-10 space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-base-content">
          Katalog Produk
        </h1>
        <div className="h-[2px] w-24 bg-base-content"></div>
      </div>

      {/* Komponen Filter */}
      <Filter />

      {/* Action Bar (Info Total Produk & Tombol Tambah) */}
      <div className="flex flex-col md:flex-row justify-between items-end mt-12 mb-8 border-b border-base-300 pb-4 gap-4">
        <h3 className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
          Menampilkan {pagination.totalProduct} Produk
        </h3>

    
        {user && user.role === "owner" && (
          <Link 
            to="/product/create" 
            className="btn btn-neutral rounded-none px-6 tracking-widest uppercase transition-all duration-300 hover:scale-105"
          >
            <FaPlus className="mr-2" /> Tambah Produk
          </Link>
        )}
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
        {!products.length ? (
          // Empty State (Tampilan saat produk tidak ditemukan) - Sangat Elegan
          <div className="col-span-full py-24 text-center">
            <h2 className="text-2xl font-light tracking-widest text-gray-400 uppercase">
              Produk Tidak Ditemukan
            </h2>
            <div className="mt-6 h-[1px] w-16 bg-gray-300 mx-auto"></div>
          </div>
        ) : (
          products.map((item) => (
            // Tambahkan class 'product-card' dan 'opacity-0' agar dikenali Anime.js
            <div key={item._id} className="product-card opacity-0"> 
              <CartProduct item={item} user={user} />
            </div>
          ))
        )}
      </div>

      {/* Pagination - Diberi jarak agar tidak menempel dengan produk */}
      <div className="mt-20 flex justify-center">
        <Pagination />
      </div>
      
    </div>
  );
};

export default ProductView;