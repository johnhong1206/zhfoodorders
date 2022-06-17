import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import dbConnect from "../util/mongo";
import axios from "axios";
import Head from "next/head";
//components
const Featured = dynamic(() => import("../components/Featured"));
const Menu = dynamic(() => import("../components/Menu"));
const PizzaList = dynamic(() => import("../components/PizzaList"));

//redux
import { selectmenuIsOpen } from "../features/menuSlice";
import { useSelector } from "react-redux";

export default function Home({ pizzaList }) {
  const [loading, setLoading] = useState(true);
  const MenuNav = useSelector(selectmenuIsOpen);

  useEffect(() => {
    if (pizzaList) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [pizzaList]);

  return (
    <div className={`max-w-screen min-h-screen `}>
      <Head>
        <title>ZH Pizza Restaurant</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />

      {!loading ? <PizzaList pizzaList={pizzaList} /> : <p>Loading...</p>}

      {MenuNav && <Menu />}
    </div>
  );
}

export const getServerSideProps = async ({ res }) => {
  await dbConnect();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  let environment = process.env.NODE_ENV;

  const url =
    environment === "development"
      ? process.env.DEV_URL
      : process.env.PRODUCTION_URL;

  const food = await axios.get(`${url}/api/products`);
  return {
    props: {
      pizzaList: food.data,
    },
  };
};
