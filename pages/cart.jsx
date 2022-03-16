import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

//redux
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../features/cartSlice";
import { selectUser } from "../features/userSlice";
import { selectmenuIsOpen } from "../features/menuSlice";

//components
const Menu = dynamic(() => import("../components/Menu"));
const OrderDetail = dynamic(() => import("../components/OrderDetail"));
const CartItems = dynamic(() => import("../components/CartItems"));

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "MYR";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const MenuNav = useSelector(selectmenuIsOpen);
  const email = user?.email;
  let environment = process.env.NODE_ENV;

  const url =
    environment === "development"
      ? "http://localhost:3000"
      : "https://zhpizzarestaurant.netlify.app/";

  const navFood = () => {
    router.push(`/`);
  };

  const paybyCOD = () => {
    setCash(true);
    setOpen(false);
  };

  const createOrder = async (data) => {
    try {
      const res = await axios.post(`${url}/api/orders`, data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    console.log("options", options);

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}

        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                email: email,
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={`p-10 flex flex-col lg:flex-row `}>
      <Head>
        <title>{email} Cart</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`flex-grow mr-4`}>
        <div className={`w-full`}>
          <div className={`flex-col gap-2 mb-4`}>
            {cart.products.map((product) => (
              <CartItems
                key={product._id}
                id={product._id}
                image={product.img}
                title={product.title}
                price={product.price}
                extras={product.extras}
                quantity={product.quantity}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`bg-[#222] w-full h-full  max-w-[500px] max-h-[300px] flex-[0.3] text-white p-10`}
      >
        <div className={`flex flex-col w-full`}>
          <h2 className={`font-bold text-xl text-center`}>CART TOTAL</h2>
          <div className={`w-full flex flex-row items-center`}>
            <h2 className="font-medium mr-1">Subtotal:</h2>
            <h2 className="font-bold">RM{cart.total}</h2>
          </div>
          <div className={`w-full flex flex-row items-center`}>
            <h2 className="font-medium mr-1">Discount</h2>
            <h2 className="">RM 0.00</h2>
          </div>
          <div className={`w-full flex flex-row items-center`}>
            <h2 className="font-medium mr-1">Total:</h2>
            <h2 className="font-bold">RM{cart.total}</h2>
          </div>
          {open ? (
            <div className={`w-full`}>
              <button
                className={`w-full my-2 bg-white text-red-500 font-medium px-6 py-2 rounded-lg mt-1 hover:text-green-500`}
                onClick={paybyCOD}
              >
                CASH ON DELIVERY
              </button>
            </div>
          ) : (
            <div className={`w-full`}>
              {cart.products.length > 0 ? (
                <button
                  onClick={() => setOpen(true)}
                  className={`w-full my-2 bg-white text-red-500 font-medium px-6 py-2 rounded-lg mt-1 hover:text-green-500`}
                >
                  CHECKOUT
                </button>
              ) : (
                <button
                  onClick={navFood}
                  className={`bg-white text-red-500 font-medium px-6 py-2 rounded-lg mt-1 hover:text-green-500`}
                >
                  Please Order your Food
                </button>
              )}
            </div>
          )}
          {open && (
            <PayPalScriptProvider
              options={{
                "client-id":
                  "ATUxLFNWZDbwgvUwzhffgDrIgf4oTp6ILAyjH8Xl4yslagmqA0XSgEpOSW3_InVeBuxonHDfw5qs-y-g",
                components: "buttons",
                currency: "MYR",
                "disable-funding": "credit,card,p24",
              }}
            >
              <ButtonWrapper currency={currency} showSpinner={false} />
            </PayPalScriptProvider>
          )}
        </div>
      </div>
      {cash && (
        <OrderDetail
          setCash={setCash}
          total={cart.total}
          createOrder={createOrder}
        />
      )}
      {MenuNav && <Menu />}
    </div>
  );
};

export default Cart;
