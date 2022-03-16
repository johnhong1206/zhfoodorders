import { useRouter } from "next/router";

//icons
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineHome,
  AiOutlineClose,
} from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";

//redux
import { closemenu } from "../features/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";

function MenuContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector(selectUser);

  const navtoHome = (e) => {
    router.push("/");
    dispatch(closemenu());
  };
  const navtoOrder = (e) => {
    router.push("/orders");
    dispatch(closemenu());
  };
  const navtoCart = (e) => {
    router.push("/cart");
    dispatch(closemenu());
  };
  const navtoLogin = (e) => {
    router.push("/login");
    dispatch(closemenu());
  };

  const signout = () => {
    dispatch(logout());
    router.push("/");
    dispatch(closemenu());
  };
  return (
    <div className="w-full h-screen relative gradient-bg text-white">
      <AiOutlineClose
        className="w-8 h-8 cursor-pointer text-white absolute top-2 right-4"
        onClick={() => dispatch(closemenu())}
      />
      <div
        className="mt-10 mb-10 flex flex-row items-center justify-center h-16 w-full
    "
      >
        <h1 className="text-4xl text-center">Zong Hong Restaurant</h1>
      </div>
      <div className="h-full space-y-8 mx-4">
        <div
          onClick={navtoHome}
          className={`flex items-center space-x-4 border-b-4 border-transparent hover:text-blue-500 hover:border-blue-500 cursor-pointer `}
        >
          <AiOutlineHome className="w-12 h-12" />
          <p className="text-xl font-medium">Home</p>
        </div>
        <div
          onClick={navtoOrder}
          className={`flex items-center space-x-4 border-b-4 border-transparent hover:text-blue-500 hover:border-blue-500 cursor-pointer `}
        >
          <BiShoppingBag className="w-12 h-12" />
          <p className="text-xl font-medium">Order</p>
        </div>
        <div
          onClick={navtoCart}
          className={`relative flex items-center border-b-4 border-transparent hover:text-[#FF4500] hover:border-[#FF4500] cursor-pointer `}
        >
          <span className="absolute top-0 left-12 h-4 w-4 text-center leading-4 rounded-full text-sm bg-white text-black">
            {quantity}
          </span>
          <FiShoppingCart className="w-12 h-12 " />
          <p className="text-xl font-medium ml-4">Cart</p>
        </div>
        {user ? (
          <div
            onClick={signout}
            className={`flex items-center space-x-4 border-b-4 border-transparent hover:text-red-500 hover:border-red-500 cursor-pointer `}
          >
            <AiOutlineLogout className="w-12 h-12" />
            <p className="text-xl font-medium">Logout</p>
          </div>
        ) : (
          <div
            onClick={navtoLogin}
            className={`flex items-center space-x-4 border-b-4 border-transparent hover:text-green-500 hover:border-green-500 cursor-pointer `}
          >
            <AiOutlineLogin className="w-12 h-12" />
            <p className="text-xl font-medium">Login</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuContent;
