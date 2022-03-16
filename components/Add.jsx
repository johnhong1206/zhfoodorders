import { useState } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Add = ({ setOpenAdd }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);
  let environment = process.env.NODE_ENV;

  const apiurl =
    environment === "development"
      ? "http://localhost:3000"
      : "https://zhpizzarestaurant.netlify.app/";

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dtount88o/image/upload",
        data
      );

      const { url } = uploadRes.data;
      console.log(url);
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post(`${apiurl}/api/products`, newProduct);
      setOpenAdd(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="fixed z-50 inset-1 overflow-y-auto ">
      <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-80 ">
        <div
          className={`relative bg-white w-[500px] px-[50px] py-[10px] mx-10 rounded-lg flex flex-col justify-between`}
        >
          <AiOutlineCloseCircle
            onClick={() => setOpenAdd(false)}
            className="w-6 h-6 text-red-600 hover:animate-pulse cursor-pointer absolute top-4 right-4"
          />
          <h1 className="text-lg text-center font-bold my-4">
            Add a new Pizza
          </h1>
          <div className={`flex flex-col mb-3`}>
            <label className={`mb-1 font-medium`}>Choose an image</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className={`flex flex-col mb-3`}>
            <label className={`mb-1 font-medium`}>Title</label>
            <input
              className={` border-gray-300 border-b outline-none`}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={`flex flex-col mb-3`}>
            <label className={`mb-1 font-medium`}>Desc</label>
            <textarea
              rows={4}
              type="text"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className={`flex flex-col mb-3`}>
            <label className={`mb-1 font-medium`}>Prices</label>
            <div className={`flex justify-between`}>
              <input
                className={`border-b border-gray-400 outline-none w-1/4`}
                type="number"
                placeholder="Small"
                onChange={(e) => changePrice(e, 0)}
              />
              <input
                className={` border-b border-gray-400 outline-none w-1/4`}
                type="number"
                placeholder="Medium"
                onChange={(e) => changePrice(e, 1)}
              />
              <input
                className={` border-b border-gray-400 outline-none w-1/4`}
                type="number"
                placeholder="Large"
                onChange={(e) => changePrice(e, 2)}
              />
            </div>
          </div>
          <div className={`flex flex-col mb-3`}>
            <label className={`mb-1 font-medium`}>Extra</label>
            <div className={`flex justify-between`}>
              <input
                className={` border-b border-gray-400 outline-none w-1/4 `}
                type="text"
                placeholder="Item"
                name="text"
                onChange={handleExtraInput}
              />
              <input
                className={`border-b border-gray-400 outline-none w-1/4 `}
                type="number"
                placeholder="Price"
                name="price"
                onChange={handleExtraInput}
              />
              <button
                className={`bg-[#008080] border-none cursor-pointer w-1/4 text-white rounded-lg hover:bg-opacity-70 font-medium p-1`}
                onClick={handleExtra}
              >
                Add
              </button>
            </div>
            <div className={`flex flex-wrap mt-2`}>
              {extraOptions.map((option) => (
                <span
                  key={option.text}
                  className={`p-1 border-red-400 border text-red-300 mx-2 rounded-full cursor-pointer`}
                >
                  {option.text}
                </span>
              ))}
            </div>
          </div>
          <button
            className={`bg-red-400 border-none cursor-pointer w-1/4 text-white rounded-lg hover:bg-opacity-70 font-medium p-1`}
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
