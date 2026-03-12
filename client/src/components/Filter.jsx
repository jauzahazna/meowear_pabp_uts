import { Form, Link, useLoaderData } from "react-router-dom";
import FormInput from "./Form/FormInput";
import FormSelect from "./Form/FormSelect";

const Filter = () => {
  const { params } = useLoaderData();
  const { name, category } = params;

  // Expanded categories based on your MEOWEAR product data
  // "Aksesoris" can be used for items like Kacamata and Collar
  const categories = [
    "Baju",
    "Cardigan",
    "Kaos",
    "Topi",
    "Celana",
    "Aksesoris",
  ];

  return (
    <Form
      method="get"
      className="bg-base-100 border-y border-base-300 py-8 mb-12 grid gap-x-6 gap-y-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end"
    >
      <FormInput
        label="Search Product"
        type="search"
        name="name"
        defaultValue={name}
      />

      <FormSelect
        label="Select Category"
        name="category"
        list={categories}
        defaultValue={category}
      />

      {/* Premium Sharp Buttons (matching the editorial aesthetic) */}
      <button
        type="submit"
        className="btn btn-neutral rounded-none tracking-widest uppercase text-xs md:text-sm font-bold w-full transition-all duration-300"
      >
        Search
      </button>

      <Link
        to="/products" /* Make sure this matches your actual route, e.g., /product or /products */
        className="btn btn-outline border-base-300 rounded-none tracking-widest uppercase text-xs md:text-sm font-bold w-full hover:bg-base-content hover:text-base-100 transition-all duration-300"
      >
        Reset
      </Link>
    </Form>
  );
};

export default Filter;
