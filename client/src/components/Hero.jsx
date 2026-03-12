import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const Hero = () => {
  const { products } = useLoaderData();
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-19 items-center">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Selamat Datang di Nafara Wear
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Dimana kalian bisa mencari pakaian trendy. Official store kami yang
            sudah pasti menyediakan pakaian original dan berkualitas premium.
          </p>
          <div className="mt-10">
            <Link to="/products" className="btn btn-primary">
              Produk Kami
            </Link>
          </div>
        </div>
        <div className="lg:carousel carousel-center bg-neutral rounded-box space-x-4= p-4">
          {products.map((item) => (
            <div className="carousel-item hover-3d  cursor-pointer" key={item._id}>
              <img src={item.image} className="rounded-box w-full h-64 object-cover m-2" />
            </div>
            
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
