import React, { useEffect } from "react";
import CartTotal from "../components/CartTotal";
import FormInput from "../components/Form/FormInput";
import { useSelector, useDispatch } from "react-redux";
import customAPI from "../api";
import { toast } from "react-toastify";
import { clearCartItem } from "../features/cartSlice";
import { redirect, useNavigate } from "react-router-dom";
// Added icons for a premium, secure checkout feel
import { FaLock, FaShieldAlt } from "react-icons/fa"; 

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_CLIENT_MIDTRANS,
    );
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

export const loader = (storage) => () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Login to access this page");
    return redirect("/login");
  }
  return null;
};

const CheckoutView = () => {
  const user = useSelector((state) => state.userState.user);
  const carts = useSelector((state) => state.cartState.CartItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    insertSnapScript();
  }, []);

  const handleCheckout = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata);

    const newArrayKeranjang = carts.map((item) => {
      return { product: item.productId, quantity: item.amount };
    });

    try {
      const response = await customAPI.post("/order", {
        email: data.email,
        firstName: data.firstname,
        lastName: data.lastname,
        phone: data.phone,
        cartItem: newArrayKeranjang,
      });

      const snapToken = response.data.token;

      window.snap.pay(snapToken.token, {
        onSuccess: function (result) {
          console.log(result);
          dispatch(clearCartItem());
          navigate("/orders");
          toast.success("Order Successful!");
        },
        onPending: function (result) {
          console.log(result);
          toast.info("Waiting for your payment...");
        },
        onError: function (result) {
          console.log(result);
          toast.error("Payment failed. Please try again.");
        },
      });
      
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Checkout failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      
      {/* --- PREMIUM HEADER --- */}
      <div className="flex flex-col items-center justify-center space-y-3 mb-12 text-center">
        <FaShieldAlt className="text-4xl text-neutral opacity-80" />
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">
          Secure Checkout
        </h2>
        <p className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
          Complete your order safely
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* --- LEFT COLUMN: BILLING FORM --- */}
        <div className="lg:col-span-7 xl:col-span-8">
          <form
            method="POST"
            onSubmit={handleCheckout}
            className="border border-base-300 bg-base-100 p-8 md:p-10 shadow-sm"
          >
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase border-b border-base-300 pb-4 mb-8">
              Billing Information
            </h3>

            <div className="space-y-6">
              {/* Name Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="First Name" type="text" name="firstname" />
                <FormInput label="Last Name" type="text" name="lastname" />
              </div>

              {/* Contact Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  defaultValue={user.email}
                />
                <FormInput label="Phone Number" type="tel" name="phone" />
              </div>
            </div>

            {/* Payment Button */}
            <div className="mt-12 pt-8 border-t border-base-300">
              <button 
                type="submit" 
                className="btn btn-neutral btn-block rounded-none tracking-[0.15em] uppercase h-14"
              >
                <FaLock className="mr-2" />
                Proceed to Payment
              </button>
              <p className="text-xs text-center text-gray-400 mt-4 tracking-wider">
                Payments are processed securely via Midtrans.
              </p>
            </div>
          </form>
        </div>

        {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
          <div className="border border-base-300 bg-base-50 p-6 shadow-sm">
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase border-b border-base-300 pb-4 mb-6">
              Order Summary
            </h3>
            <CartTotal />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutView;