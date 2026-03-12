import React, { useEffect, useRef } from "react";
import { useLoaderData, Link } from "react-router-dom";
import customAPI from "../api";
import CartProduct from "../components/CartProduct";

// --- Tech Stack Imports ---
import { animate, createScope } from "animejs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";

// --- Swiper CSS ---
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export const loader = async ({ request }) => {
  const { data } = await customAPI.get("/product?limit=6");
  const products = data.data;
  return { products };
};

const HomeView = () => {
  const { products } = useLoaderData();
  
  const rootRef = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    if (products && products.length > 0) {
      scope.current = createScope({ root: rootRef }).add(() => {
        animate('.product-card', {
          y: [60, 0],         
          opacity: [0, 1],    
          duration: 1200,     
          delay: (_, i) => i * 150, 
          ease: 'out(4)'      
        });
      });
    }

    return () => {
      if (scope.current) scope.current.revert();
    };
  }, [products]);

  return (
    <div ref={rootRef} className="pb-24">
      
      {/* --- SECTION 1: HERO BANNER --- */}
      <section className="relative w-full mb-20 md:mb-32">
        <Swiper
          spaceBetween={0}
          effect={"fade"}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="w-full h-[70vh] md:h-[90vh]" 
        >
          {/* Banner 1 */}
          <SwiperSlide className="relative flex items-center justify-center">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/banner1.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black/50 z-10"></div> 
            
            {/* TAMBAHAN DI SINI: translate-y-16 md:translate-y-24 untuk mendorong teks ke bawah */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-8 translate-y-16 md:translate-y-24">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[1.1]">
                Definisikan<br/>Gaya Kucingmu
              </h1>
              <div className="pt-4">
                <Link to="/products" className="inline-block bg-white text-black px-10 py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors duration-300">
                  Belanja Sekarang
                </Link>
              </div>
            </div>
          </SwiperSlide>

          {/* Banner 2 */}
          <SwiperSlide className="relative flex items-center justify-center">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/banner2.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            
            {/* TAMBAHAN DI SINI: translate-y-16 md:translate-y-24 untuk mendorong teks ke bawah */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-8 translate-y-16 md:translate-y-24">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[1.1]">
                Estetika<br/>Minimalis.
              </h1>
              <div className="pt-4">
                <Link to="/products" className="inline-block border border-white text-white px-10 py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300">
                  Lihat Katalog
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* --- SECTION 2: PRODUCT LIST --- */}
      <section className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-8 mb-16">
          <div className="space-y-3">
            <h3 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-gray-400">
              Kedatangan Baru
            </h3>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-base-content">
              Produk Pilihan.
            </h2>
          </div>
          
          <Link 
            to="/products" 
            className="group flex items-center gap-4 mt-8 md:mt-0 text-xs md:text-sm font-bold tracking-[0.2em] uppercase hover:text-gray-500 transition-colors"
          >
            Lihat Semua Produk
            <FaArrowRight className="transform group-hover:translate-x-3 transition-transform duration-300 text-lg" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {products && products.length > 0 ? (
            products.map((item) => (
              <div key={item._id} className="product-card opacity-0"> 
                <CartProduct item={item} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500 tracking-widest uppercase">
              Belum ada produk yang tersedia.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeView;