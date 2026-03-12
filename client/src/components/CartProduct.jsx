import React from "react";
import { Link, useRevalidator } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { priceFormat } from "../utils";
import { toast } from "react-toastify";
import customAPI from "../api";

const CartProduct = ({ item, user }) => {
  const { revalidate } = useRevalidator();
  return (
    <>
      <div className="card bg-base-300 shadow-xl" key={item._id}>
        <figure>
          <div className="relative">
            <img src={item.image} alt="Shoes" />
            {item.stock < 1 && (
              <span className="absolute top-0 right-0 bg-error font-bold text-2xl">
                Sold Out
              </span>
            )}
          </div>
        </figure>
        <div className="card-body">
          {user && user.role === "owner" && (
            <div className="flex justify-end gap-x-3">
              <FaTrash
                onClick={async () => {
                  await customAPI.delete(`/product/${item._id}`);
                  toast.info("delete berhasil");
                  revalidate();
                }}
                className="text-red-500 cursor-pointer "
              />
              <Link to={`/product/${item._id}/edit`}>
                <FaPencilAlt className="text-info cursor-pointer" />
              </Link>
            </div>
          )}

          <h2 className="card-title text-primary">{item.name}</h2>
          <p className="font-bold text-blue-950">{priceFormat(item.price)}</p>
          <p>{item.description.substring(0, 50)}</p>
          <div className="hover-3d card-actions justify-end">
            <Link to={`/Product/${item._id}`} className="btn btn-primary">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
