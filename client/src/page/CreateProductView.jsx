import React, { useState } from "react"; // Added useState
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import FormTextArea from "../components/Form/FormTextArea";
import customAPI from "../api";
import { toast } from "react-toastify";
import { useNavigate, redirect } from "react-router-dom";

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("Anda Harus Login Dulu");
    return redirect("/login")
  }
  if (user.role != "owner") {
    toast.warn("Anda tidak bisa mengakses halaman ini");
    return redirect("/")
  }
  return null
};

const CreateProductView = () => {
  const categories = ["sepatu", "baju", "kemeja", "celana"];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const form = event.target;
    const dataForm = new FormData(form);

    try {
      // 1. Upload File
      const responseFileUpload = await customAPI.post(
        "/product/file-upload",
        dataForm, // Send the whole FormData
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      const imageUrl = responseFileUpload.data.url;

      // 2. Create Product
      await customAPI.post("/product", {
        name: dataForm.get("name"),
        price: dataForm.get("price"),
        description: dataForm.get("description"),
        stock: dataForm.get("stock"),
        category: dataForm.get("category"),
        image: imageUrl,
      });

      toast.success("Berhasil tambah product");
      navigate("/products");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error?.response?.data?.message || "Internal Server Error";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <section className="mt-10 flex justify-center">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-5 border-b pb-2">
            Create New Product
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
              <div className="space-y-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-semibold capitalize">
                      Product Image
                    </span>
                  </div>
                  <input
                    type="file"
                    name="image"
                    required
                    className="file-input file-input-bordered file-input-primary w-full"
                  />
                </label>
                <FormInput name="name" label="Nama Product" type="text" />
                <FormSelect
                  name="category"
                  label="Pilih Category"
                  list={categories}
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormInput name="price" label="Harga (Rp)" type="number" />
                  <FormInput name="stock" label="Stock" type="number" />
                </div>
                <FormTextArea name="description" label="Description Product" />
              </div>
            </div>

            <div className="card-actions justify-end mt-8 border-t pt-5">
              <button
                type="submit"
                disabled={loading} // Disable while loading
                className="btn btn-primary btn-wide text-white"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Upload Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateProductView;
