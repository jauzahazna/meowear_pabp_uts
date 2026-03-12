import { BsCart3, BsPersonCircle } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import customAPI from "../api";
import { logoutUser } from "../features/userSlice";
import { Navlist } from "./Navlist";
import { clearCartItem } from "../features/cartSlice";

const Nav = () => {
  const user = useSelector((state) => state.userState.user);
  const countInCart = useSelector((state) => state.cartState.numItemsInCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlingLogout = async () => {
    try {
      await customAPI.get("/auth/logout");
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/");
    } catch (error) {
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-xl border-b border-base-200 transition-all duration-300">
      <div className="navbar mx-auto max-w-7xl px-4 md:px-8 h-20 flex justify-between items-center">
        
        {/* --- KIRI: Menu Mobile & Logo --- */}
        <div className="flex items-center gap-2">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle -ml-2 hover:bg-base-200">
              <FaBarsStaggered className="h-5 w-5 text-base-content" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 z-[1] p-6 shadow-2xl bg-base-100 border border-base-200 rounded-none w-72 gap-y-6"
            >
              <Navlist />
            </ul>
          </div>
          
          <NavLink to="/" className="group flex items-center">
            <span className="text-xl md:text-2xl font-black tracking-[0.2em] uppercase text-base-content group-hover:tracking-[0.25em] transition-all duration-500 ease-out">
              MEOWEAR
            </span>
          </NavLink>
        </div>

        {/* --- TENGAH: Menu Navigasi PC --- */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-x-10">
            <Navlist />
          </ul>
        </div>

        {/* --- KANAN: Cart & Profile --- */}
        <div className="flex items-center gap-4 md:gap-6">
          
          <NavLink to="/cart" className="group flex items-center cursor-pointer">
            <div className="indicator transition-transform duration-300 group-hover:-translate-y-1">
              <BsCart3 className="h-5 w-5 md:h-6 md:w-6 text-base-content" />
              <span className="badge badge-neutral badge-sm indicator-item font-bold shadow-md transform group-hover:scale-110 transition-transform">
                {countInCart}
              </span>
            </div>
          </NavLink>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-base-300 hover:border-base-content transition-colors duration-300">
                <div className="w-10 rounded-full flex items-center justify-center bg-base-200 text-base-content">
                  <span className="text-sm font-bold uppercase">
                    {user.name ? user.name.charAt(0) : <BsPersonCircle className="h-5 w-5" />}
                  </span>
                </div>
              </label>
              
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-5 z-[1] p-0 shadow-2xl bg-base-100 border border-base-200 rounded-none w-56 overflow-hidden">
                <li className="px-5 py-4 bg-base-200/50 pointer-events-none">
                  <span className="text-xs font-bold tracking-widest uppercase text-base-content block">
                    Halo, {user.name || "Pelanggan"}
                  </span>
                </li>
                <li>
                  <NavLink to="/orders" className="py-4 px-5 uppercase tracking-wider text-xs font-bold hover:bg-base-content hover:text-base-100 rounded-none transition-colors duration-300">
                    Pesanan Saya
                  </NavLink>
                </li>
                <li>
                  <button 
                    onClick={handlingLogout} 
                    className="py-4 px-5 uppercase tracking-wider text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white rounded-none transition-colors duration-300"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-neutral btn-sm rounded-none px-6 uppercase tracking-widest text-xs hidden sm:flex hover:scale-105 hover:shadow-lg transition-all duration-300">
              Login
            </NavLink>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Nav;