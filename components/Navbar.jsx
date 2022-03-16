import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

//icons
import { AiOutlinePhone, AiOutlineMenu } from "react-icons/ai";

//redux
import { openmenu } from "../features/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const signout = () => {
    dispatch(logout());
    router.push("/");
  };

  const navLogin = () => {
    router.push("/login");
  };

  return (
    <div
      className={`gradient-bg sticky   top-0  z-50 h-[100px] px-10 py-2 flex items-center justify-between`}
    >
      <div className={`flex flex-1 items-center`}>
        <div
          className={`bg-white flex items-center justify-center rounded-full p-[10px] w-[50px] h-[50px]`}
        >
          <AiOutlinePhone className={`w-8 h-8`} />
        </div>
        <div className={`ml-5 text-white`}>
          <div className={` text-xs font-medium`}>ORDER NOW!</div>
          <div className={` text-xl font-bold`}>016-3417337</div>
        </div>
      </div>
      <div className={`flex flex-1 items-center`}>
        <ul className={`hidden lg:flex text-white items-center`}>
          <Link href="/" passHref>
            <li
              className={` m-5 text-white font-medium cursor-pointer hover:text-gray-100 hover:underline`}
            >
              Homepage
            </li>
          </Link>
          <li
            className={` m-5 text-white font-medium cursor-pointer hover:text-gray-100 hover:underline`}
          >
            Products
          </li>
          <li
            className={` m-5 text-white font-medium cursor-pointer hover:text-gray-100 hover:underline`}
          >
            Menu
          </li>
          <li
            className={` m-5 text-white font-medium cursor-pointer hover:text-gray-100 hover:underline`}
          >
            Events
          </li>
          <li
            className={` m-5 text-white font-medium cursor-pointer hover:text-gray-100 hover:underline`}
          >
            Blog
          </li>
          <li
            className={` m-5 text-white font-medium cursor-pointer hover:text-gray-100 hover:underline`}
          >
            Contact
          </li>
          {user?.admin === true && (
            <Link href="/admin" passHref>
              <li
                className={` m-5 text-white font-medium cursor-pointer hover:text-gray-100 hover:underline`}
              >
                Admin
              </li>
            </Link>
          )}
          {user && user?.admin === false && (
            <Link href="/orders" passHref>
              <li
                className={` m-5 text-white font-medium cursor-pointer hover:text-gray-100 hover:underline`}
              >
                Orders
              </li>
            </Link>
          )}

          {!user ? (
            <div onClick={navLogin}>
              <li
                className={` m-5 text-white font-medium cursor-pointer hover:text-gray-100 hover:underline`}
              >
                Login
              </li>
            </div>
          ) : (
            <li
              onClick={signout}
              className={` m-5 text-white font-medium cursor-pointer hover:text-gray-100 hover:underline`}
            >
              Logout
            </li>
          )}
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={`flex flex-1 items-center justify-end `}>
          <div className={`relative`}>
            <Image
              src="/img/cart.png"
              alt=""
              width="30px"
              height="30px"
              className="cursor-pointer"
            />
            <div
              className={`absolute -top-[10px] -right-[10px] rig text-[#0f2027] rounded-full flex items-center justify-center w-5 h-5 leading-3 p-[3px] bg-white`}
            >
              {quantity}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex lg:hidden">
        <AiOutlineMenu
          className="w-8 h-8 cursor-pointer text-white ml-10"
          onClick={() => dispatch(openmenu())}
        />
      </div>
    </div>
  );
};

export default Navbar;
