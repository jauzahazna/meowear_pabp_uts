import { useState, useEffect } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import customAPI from "../api";
import Loading from "../components/Loading";
import FormInput from "../components/Form/FormInput";
import FormTextArea from "../components/Form/FormTextArea";
import FormSelect from "../components/Form/FormSelect";
import { toast } from "react-toastify";

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

const EditProductView = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const categories = ["sepatu", "baju", "kemeja", "celana"];

  const { id } = useParams();
  const navigate = useNavigate();
  const getProductId = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const form = event.target;
    const dataForm = new FormData(form);

    try {
      // 2. Create Product
      await customAPI.put(`/product/${id}`, {
        name: dataForm.get("name"),
        price: dataForm.get("price"),
        description: dataForm.get("description"),
        stock: dataForm.get("stock"),
        category: dataForm.get("category"),
      });

      toast.success("Berhasil update product");
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

  useEffect(() => {
    getProductId();
  }, []);

  return (
    <>
      {product ? (
        <form onSubmit={handleSubmit}>
          <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
            <div className="space-y-4">
              <FormInput
                name="name"
                label="Nama Product"
                type="text"
                defaultValue={product.name}
              />
              <FormSelect
                name="category"
                label="Pilih Category"
                list={categories}
                defaultValue={product.category}
              />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  name="price"
                  label="Harga (Rp)"
                  type="number"
                  defaultValue={product.price}
                />
                <FormInput
                  name="stock"
                  label="Stock"
                  type="number"
                  defaultValue={product.stock}
                />
              </div>
              <FormTextArea
                name="description"
                label="Description Product"
                defaultValue={product.description}
              />
            </div>
          </div>

          <div className="card-actions justify-end mt-8 border-t pt-5">
            <button
              type="submit"
              value="Edit"
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
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditProductView;
