import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import dbConnect from "../../util/mongo";

//components
const Menu = dynamic(() => import("../../components/Menu"));

//redux
import { useDispatch, useSelector } from "react-redux";
import { selectmenuIsOpen } from "../../features/menuSlice";
import { addProduct } from "../../features/cartSlice";

function ProductDetails({ pizza }) {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();
  const MenuNav = useSelector(selectmenuIsOpen);

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    quantity > 0 && dispatch(addProduct({ ...pizza, extras, price, quantity }));
  };

  return (
    <div
      className={`min-h-screen-[100px] max-w-screen mx-auto mt-5 flex flex-col lg:flex-row`}
    >
      <Head>
        <title>{pizza.title}</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`flex items-center justify-center`}>
        <div className={` w-4/5 h-4/5`}>
          <Image
            src={pizza.img}
            width={400}
            height={400}
            objectFit="contain"
            alt=""
            className=""
          />
        </div>
      </div>
      <div className={`flex-1 p-5`}>
        <h1 className={`m-1`}>{pizza.title}</h1>
        <span
          className={`text-red-400 text-2xl font-medium border-b-2 border-red-500`}
        >
          RM{price}
        </span>
        <p className={`my-2 text-sm`}>{pizza.desc}</p>
        <h3 className={``}>Choose the size</h3>
        <div
          className={`w-full lg:w-2/5 my-2 flex items-center justify-center space-x-12`}
        >
          <div
            className={` w-[30px] h-[30px] relative cursor-pointer`}
            onClick={() => handleSize(0)}
          >
            <Image src="/img/size.png" layout="fill" alt="" />
            <span
              className={`absolute -top-1 -right-7 bg-[#008080] text-white text-xs rounded py-0 px-1`}
            >
              Small
            </span>
          </div>
          <div
            className={` w-[40px] h-[40px] relative cursor-pointer`}
            onClick={() => handleSize(1)}
          >
            <Image src="/img/size.png" layout="fill" alt="" />
            <span
              className={`absolute -top-1 -right-8 bg-[#008080] text-white text-xs rounded py-0 px-1`}
            >
              Medium
            </span>
          </div>
          <div
            className={` w-[50px] h-[50px] relative cursor-pointer`}
            onClick={() => handleSize(2)}
          >
            <Image src="/img/size.png" layout="fill" alt="" />
            <span
              className={`absolute -top-1 -right-5 bg-[#008080] text-white text-xs rounded py-0 px-1`}
            >
              Large
            </span>
          </div>
        </div>
        <h3 className={`my-5`}>Choose additional ingredients</h3>
        <div
          className={`grid grid-flow-row-dense grid-cols-2 lg:grid-cols-3 gap-2 mb-8`}
        >
          {pizza.extraOptions.map((option) => (
            <div className={`flex items-center`} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={`w-5 h-5 mr-1`}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className={``}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={` w-12 h-8`}
          />
          <button
            className={`ml-5 rounded-lg px-6 py-3 text-white bg-[#d1411e] hover:bg-opacity-90 cursor-pointer font-medium `}
            onClick={handleClick}
          >
            Add to Cart
          </button>
        </div>
      </div>
      {MenuNav && <Menu />}
    </div>
  );
}

export default ProductDetails;
export const getServerSideProps = async ({ params }) => {
  await dbConnect();
  let environment = process.env.NODE_ENV;

  const url =
    environment === "development"
      ? process.env.DEV_URL
      : process.env.PRODUCTION_URL;

  const res = await axios.get(`${url}/api/products/${params.id}`);
  return {
    props: {
      pizza: res.data,
    },
  };
};
