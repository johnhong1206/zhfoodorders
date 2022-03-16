import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import dbConnect from "../../util/mongo";

//redux
import { useSelector } from "react-redux";
import { selectmenuIsOpen } from "../../features/menuSlice";

//components
const Menu = dynamic(() => import("../../components/Menu"));

const Order = ({ order }) => {
  const MenuNav = useSelector(selectmenuIsOpen);
  const [phase, setPhase] = useState("payment");

  useEffect(() => {
    if (order.status === 0) {
      setPhase("payment");
    }
    if (order.status === 1) {
      setPhase("preparing");
    }
    if (order.status === 2) {
      setPhase("delivering");
    }
    if (order.status === 3) {
      setPhase("complete");
    }
  }, [order]);

  return (
    <div className={`flex flex-col lg:flex-row p-14`}>
      <div className={`w-full max-w-full lg:max-w-[75%]`}>
        <div className={`w-full`}>
          <div
            className={`flex-grow px-3 py-1 mb-8 lg:mb-16 w-full flex flex-col lg:flex-row items-center justify-between`}
          >
            <div className="flex flex-row lg:flex-col">
              <h2 className="font-bold mr-2 lg:mr-0 text-center">Order ID</h2>
              <p>{order?._id}</p>
            </div>
            <div className="flex flex-row lg:flex-col">
              <h2 className="font-bold mr-2 lg:mr-0 text-center">Customer</h2>
              <p>{order?.customer}</p>
            </div>
            <div className="flex flex-row lg:flex-col">
              <h2 className="font-bold mr-2 lg:mr-0 text-center">Address</h2>
              <p>{order?.address}</p>
            </div>
            <div className="flex flex-row lg:flex-col">
              <h2 className="font-bold mr-2 lg:mr-0 text-center">Total</h2>
              <p>RM {order?.total}</p>
            </div>
          </div>
        </div>
        <div
          className={`mb-10 lg:mb-0 flex flex-col lg:flex-row w-full lg:w-[80%] justify-center lg:justify-between`}
        >
          <div className={`flex flex-col items-center justify-center`}>
            <Image
              src="/img/paid.png"
              width={30}
              height={30}
              alt=""
              className=""
            />
            <span>Payment</span>
            {order?.status >= 0 && (
              <div>
                <Image src="/img/checked.png" width={20} height={20} alt="" />
              </div>
            )}
          </div>
          <div
            className={`flex flex-col items-center justify-center ${
              phase === "payment" && "animate-pulse"
            }`}
          >
            <Image src="/img/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            {order?.status >= 1 && (
              <div>
                <Image src="/img/checked.png" width={20} height={20} alt="" />
              </div>
            )}
          </div>
          <div
            className={`flex flex-col items-center justify-center ${
              phase === "preparing" && "animate-pulse"
            }`}
          >
            <Image src="/img/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            {order?.status >= 2 && (
              <div>
                <Image src="/img/checked.png" width={20} height={20} alt="" />
              </div>
            )}
          </div>
          <div
            className={`flex flex-col items-center justify-center ${
              phase === "delivering" && "animate-pulse"
            }`}
          >
            <Image src="/img/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            {order?.status >= 3 && (
              <div>
                <Image src="/img/checked.png" width={20} height={20} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`w-full max-w-full lg:max-w-[25%]`}>
        <div className={`bg-[#333] text-white shadow-lg p-4 space-y-1`}>
          <h2 className={`font-bold text-center text-lg`}>Cart Total</h2>
          <div className="flex flex-row">
            <h2 className="mr-3">SubTotal:</h2>
            <p className="font-bold">RM {order?.total}</p>
          </div>
          <div className="flex flex-row">
            <h2 className="mr-3">Discount:</h2>
            <p className="font-bold">RM 0.00</p>
          </div>
          <div className="flex flex-row">
            <h2 className="mr-3">Total:</h2>
            <p className="font-bold">RM {order?.total}</p>
          </div>
          <div className="rounded-lg w-full bg-white text-green-500 text-center font-bold text-lg">
            <p>Paid</p>
          </div>
        </div>
      </div>
      {MenuNav && <Menu />}
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  await dbConnect();
  let environment = process.env.NODE_ENV;

  const url =
    environment === "development"
      ? "http://localhost:3000"
      : "https://zhpizzarestaurant.netlify.app/";

  const res = await axios.get(`${url}/api/orders/${params.id}`);
  return {
    props: { order: res.data },
  };
};

export default Order;
