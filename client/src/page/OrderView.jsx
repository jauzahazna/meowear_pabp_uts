import React from "react";
import { redirect, useLoaderData, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { priceFormat } from "../utils";
import customAPI from "../api";
// Tambahkan icon untuk mempercantik tampilan
import { FaBoxOpen, FaReceipt } from "react-icons/fa";

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Login untuk mengakses halaman ini");
    return redirect("/login");
  }
  let orders;
  if (user.role !== "owner") {
    const { data } = await customAPI.get("/order/current/user");
    orders = data.data;
  } else {
    const { data } = await customAPI.get("/order");
    orders = data.data;
  }

  return { orders, userRole: user.role };
};

const OrderView = () => {
  const { orders, userRole } = useLoaderData();

  // --- EMPTY STATE (TAMPILAN JIKA KOSONG) ---
  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 animate-fade-in">
        <FaBoxOpen className="text-7xl text-gray-300 mb-6" />
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-base-content mb-3 text-center">
          Belum Ada Pesanan.
        </h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          {userRole === "owner" 
            ? "Belum ada transaksi masuk dari pelanggan." 
            : "Anda belum melakukan transaksi apapun. Mari mulai berbelanja!"}
        </p>
        {userRole !== "owner" && (
          <Link to="/product" className="btn btn-neutral rounded-none px-8 tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105">
            Mulai Belanja
          </Link>
        )}
      </div>
    );
  }

  // --- TAMPILAN JIKA ADA PESANAN ---
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      
      {/* HEADER PAGE */}
      <div className="flex items-center gap-4 mb-10 border-b border-base-300 pb-6">
        <div className="p-4 bg-base-200 rounded-none">
          <FaReceipt className="text-2xl text-base-content" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-base-content">
            {userRole === "owner" ? "Semua Pesanan" : "Riwayat Pesanan"}
          </h1>
          <p className="text-gray-500 mt-1 font-medium tracking-wide">
            Pantau status dan detail transaksi di sini.
          </p>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-x-auto bg-transparent border border-base-300 shadow-sm">
        <table className="table w-full">
          {/* Table Head - Minimalist Style */}
          <thead className="bg-base-200 text-gray-500 uppercase tracking-[0.15em] text-xs">
            <tr>
              <th className="py-4 font-bold">No.</th>
              <th className="py-4 font-bold">Pemesan</th>
              <th className="py-4 font-bold">Detail Produk</th>
              <th className="py-4 font-bold">Total Harga</th>
              <th className="py-4 font-bold text-center">Status</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="text-sm">
            {orders.map((item, index) => (
              <tr key={item._id} className="border-b border-base-200 hover:bg-base-100/50 transition-colors duration-200">
                <td className="py-6 font-bold text-gray-400">{index + 1}</td>
                
                <td className="py-6">
                  <p className="font-bold text-base-content tracking-wide capitalize">
                    {item.firstName} {item.lastName}
                  </p>
                </td>
                
                <td className="py-6 min-w-[200px]">
                  {/* Clean Stack List instead of bullets */}
                  <div className="space-y-3">
                    {item.itemsDetail.map((itemProduct, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="font-bold text-base-content line-clamp-1">
                          {itemProduct.name}
                        </span>
                        <span className="text-xs text-gray-500 font-medium mt-0.5">
                          {itemProduct.quantity} x {priceFormat(itemProduct.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                
                <td className="py-6">
                  <span className="font-black text-base-content tracking-tight">
                    {priceFormat(item.total)}
                  </span>
                </td>
                
                <td className="py-6 text-center">
                  {/* Premium Sharp Badges */}
                  <span className={`inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest border rounded-none ${
                    item.status === "pending" 
                      ? "bg-base-200 text-gray-700 border-gray-300"
                      : item.status === "success" 
                      ? "bg-neutral text-neutral-content border-neutral"
                      : "bg-red-50 text-red-600 border-red-200"
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default OrderView;