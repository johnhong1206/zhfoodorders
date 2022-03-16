import dbConnect from "../util/mongo";
import axios from "axios";

export default function Home({ pizzaList }) {
  console.log(pizzaList);
  return (
    <div>
      {pizzaList?.map((pizza) => (
        <div key={pizza._id}>{pizza?.title}</div>
      ))}
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
