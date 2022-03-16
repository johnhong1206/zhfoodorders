import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import dbConnect from "../util/mongo";
import axios from "axios";
import Head from "next/head";
//components
const Featured = dynamic(() => import("../components/Featured"));
const Menu = dynamic(() => import("../components/Menu"));

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

      {pizzaList?.map((pizza) => (
        <div key={pizza._id}>{pizza?.title}</div>
      ))}
      {MenuNav && <Menu />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  await dbConnect();
  const url =
    process.env.PROD_STATUS === "true"
      ? process.env.PRODUCTION_URL
      : process.env.DEV_URL;

  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get(`${url}/api/products`);
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
