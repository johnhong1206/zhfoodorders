import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";
import Head from "next/head";
import dbConnect from "../../util/mongo";
import { useRouter } from "next/router";

//redux
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectmenuIsOpen } from "../../features/menuSlice";

import { selectUser } from "../../features/userSlice";

const Menu = dynamic(() => import("../../components/Menu"));
const Add = dynamic(() => import("../../components/Add"));

const Index = ({ orders, products }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [openAdd, setOpenAdd] = useState(false);
  const status = ["preparing", "on the way", "delivered"];
  const MenuNav = useSelector(selectmenuIsOpen);
  const user = useSelector(selectUser);
  const router = useRouter();

  let environment = process.env.NODE_ENV;

  const url =
    environment === "development"
      ? "http://localhost:3000"
      : "https://zhpizzarestaurant.netlify.app/";

  useEffect(() => {
    if (!user || !user?.admin) {
      router.push("/login");
    }
  }, [user]);

  const handleDelete = async (id) => {
    console.log("id", id);
    try {
      const res = await axios.delete(`${url}/api/products/` + id);
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put(`${url}/api/orders/` + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user?.admin) return false;

  return (
    <div className="flex flex-col lg:flex-row w-screen">
      <Head>
        <title>Admin</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-1  w-full lg:w-1/2">
        <h1 className="font-bold text-center text-2xl">Products</h1>
        <div className="w-full flex-1">
          {pizzaList?.map((product) => (
            <div
              key={product._id}
              className="flex flex-row items-center justify-between  hover:border-b hover:shadow-sm px-2 py-3"
            >
              <div className="flex-[0.1]">
                <Image
                  src={product.img}
                  width={50}
                  height={50}
                  objectFit="cover"
                  alt=""
                />
              </div>
              <div className="flex-[0.1] mx-1">
                <h2>{product._id.slice(0, 5)}...</h2>
              </div>
              <div className="flex-[0.55]">
                <h2 className="text-center">{product.title}</h2>
              </div>
              <div className="flex-[0.15]">
                <h2>
                  <span>RM</span>
                  {product.prices[0]}
                </h2>
              </div>
              <div className="flex flex-row items-center justify-center flex-[0.1] space-x-5">
                <button className=" cursor-pointer bg-[#008080] text-white font-medium px-3 py-1 rounded">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="cursor-pointer bg-red-400 text-white font-medium px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => setOpenAdd(true)}
            className=" p-2 m-5 bg-red-400 w-40 rounded-lg text-lg font-semibold text-white"
          >
            Add
          </button>
          {openAdd && <Add setOpenAdd={setOpenAdd} />}
        </div>
      </div>
      <div className="flex-1  w-full lg:w-1/2">
        <h1 className="font-bold text-center text-2xl">Orders</h1>
        <div className="w-full flex-1">
          {orderList?.map((order) => (
            <div
              key={order._id}
              className="flex flex-row items-center justify-between  hover:border-b hover:shadow-sm px-2 py-3"
            >
              <div className="flex-[0.1]">
                <h2>{order._id.slice(0, 5)}...</h2>
              </div>
              <div className="flex-[0.4]">
                <h2>{order.customer}</h2>
              </div>

              <div className="flex-[0.1]">
                <h2>
                  <span>RM{order.total}</span>
                </h2>
              </div>
              <div className="flex-[0.1]">
                <h2>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </h2>
              </div>
              <div className="flex-[0.1]">
                <h2>{status[order.status]}</h2>
              </div>
              <div className="flex flex-row items-center justify-center flex-[0.2]">
                <button
                  onClick={() => handleStatus(order._id)}
                  className=" max-w-1/2 cursor-pointer bg-blue-400 text-white font-medium px-2  py-1 rounded"
                >
                  Next Stage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {MenuNav && <Menu />}
    </div>
  );
};

export const getServerSideProps = async () => {
  await dbConnect();
  let environment = process.env.NODE_ENV;

  const url =
    environment === "development"
      ? "http://localhost:3000"
      : "https://zhpizzarestaurant.netlify.app/";

  const productRes = await axios.get(`${url}/api/products`);
  const orderRes = await axios.get(`${url}/api/orders`);

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
