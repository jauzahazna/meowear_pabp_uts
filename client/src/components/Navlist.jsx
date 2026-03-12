import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// 1. Pindahkan "about" ke urutan paling bawah agar tampil terakhir
const links = [
  { id: 2, url: "products", text: "products" },
  { id: 3, url: "orders", text: "orders" },
  { id: 4, url: "checkout", text: "checkout" },
  { id: 1, url: "about", text: "about" },
];

export const Navlist = () => {
  const user = useSelector((state) => state.userState.user);

  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        
        // Sembunyikan orders dan checkout jika user belum login
        if ((url === "orders" || url === "checkout") && !user) {
          return null;
        }

        return (
          // 2. Trik Flexbox: Jika url-nya "about", berikan margin-left: auto
          // Ini akan menendang "about" ke ujung kanan navbar (jika parent container-nya flex & w-full)
          <li 
            key={id} 
            className={`mx-1 list-none ${url === "about" ? "lg:ml-auto" : ""}`}
          >
            <NavLink
              to={url}
              className={({ isActive }) =>
                `group relative inline-block px-3 py-2 bg-transparent hover:bg-transparent uppercase text-xs md:text-sm font-bold tracking-[0.15em] transition-all duration-300 ${
                  isActive 
                    ? "text-base-content" 
                    : "text-gray-400 hover:text-base-content hover:-translate-y-0.5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {text}
                  {/* Animasi Garis Bawah yang Mewah */}
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] w-full bg-base-content transition-transform duration-300 ease-out origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};