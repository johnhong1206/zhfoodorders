import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import dbConnect from "../../util/mongo";

//redux
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectmenuIsOpen } from "../../features/menuSlice";

//components
const OrderList = dynamic(() => import("../../components/OrderList"));
const Menu = dynamic(() => import("../../components/Menu"));

function Index({ orders }) {
  console.log(orders);
  const user = useSelector(selectUser);
  const email = user?.email;
  const userOrders = orders.filter((order) => order.email === email);
  const MenuNav = useSelector(selectmenuIsOpen);

  return (
    <div>
      <Head>
        <title>{user?.email} Order</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {userOrders?.map((order) => (
        <OrderList
          key={order?._id}
          id={order?._id}
          customer={order?.customer}
          total={order?.total}
          status={order?.status}
          createdAt={order?.createdAt}
        />
      ))}
      {MenuNav && <Menu />}
    </div>
  );
}

export default Index;
export const getServerSideProps = async () => {
  await dbConnect();
  let environment = process.env.NODE_ENV;

  const url =
    environment === "development"
      ? "http://localhost:3000"
      : "https://zhpizzarestaurant.netlify.app/";
  const orderRes = await axios.get(`${url}/api/orders`);
  return {
    props: {
      orders: orderRes.data,
    },
  };
};
