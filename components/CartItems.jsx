import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function CartItems({ key, id, image, title, price, extras, quantity }) {
  const router = useRouter();

  const navProduct = () => {
    router.push(`/product/${id}`);
  };
  return (
    <div
      key={key}
      className="flex flex-col lg:flex-row w-full items-center relative border-b hover:shadow-md"
    >
      <div className="relative">
        <Image
          onClick={navProduct}
          src={image}
          height={150}
          width={150}
          objectFit="contain"
          className={`cursor-pointer object-contain`}
          alt="cartItemImage"
        />
      </div>
      <div className="flex flex-col items-start ml-6">
        <h2 onClick={navProduct} className="hover:underline">
          {title}
        </h2>
        {extras.map((extra) => (
          <div key={extra?._id}>
            <p>{extra.text}, </p>
          </div>
        ))}
        <div className="flex flex-row items-center space-x-2">
          <h2 className="font-semibold texgt-xl text-center">
            Subtital: RM {price * quantity}
          </h2>
        </div>
      </div>
      <div className="flex flex-col items-start ml-6">
        <h2 className="font-semibold">
          RM{price}
          <span className="mx-2">*</span>
          {quantity} Set
        </h2>
      </div>
    </div>
  );
}

export default CartItems;
