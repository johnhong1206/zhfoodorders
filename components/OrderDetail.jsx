import { useState } from "react";

//redux
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

//icons
import { AiOutlineCloseCircle } from "react-icons/ai";

const OrderDetail = ({ total, createOrder, setCash }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const user = useSelector(selectUser);

  const handleClick = () => {
    const email = user?.email;
    createOrder({ email, customer, address, total, method: 0 });
  };

  return (
    <div className="fixed z-50 inset-1 overflow-y-auto ">
      <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-80 ">
        <div className="bg-white relative w-3/4 px-4 py-5">
          <AiOutlineCloseCircle
            onClick={() => setCash(false)}
            className="w-6 h-6 text-red-600 hover:animate-pulse cursor-pointer absolute top-4 right-4"
          />
          <h1 className={`text-lg text-center font-medium mb-3`}>
            You will pay RM5 after delivery.
          </h1>
          <div className={`flex flex-col mb-3`}>
            <label className={` mb-1 font-semibold`}>Contact Name</label>
            <input
              placeholder="contact name"
              type="text"
              className={` border-gray-300 border-b outline-none`}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>
          <div className={`flex flex-col my-5`}>
            <label className={` mb-1 font-semibold`}>Contact Number</label>
            <input
              placeholder="(+60) Phone Number"
              type="text"
              className={` border-gray-300 border-b outline-none`}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>
          <div className={`flex flex-col my-5`}>
            <label className={` mb-1 font-semibold`}>Delivery Address</label>
            <textarea
              rows={5}
              placeholder="lot1,taman example ,Jalan example...  "
              type="text"
              className={`w-full`}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
            className={` border-none bg-[#008080] text-white font-medium w-full px-1 py-2 rounded-lg hover:bg-opacity-50 cursor-pointer
            `}
            onClick={handleClick}
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
