import Image from "next/image";
import Link from "next/link";

function PizzaCard({ key, pizza }) {
  return (
    <div key={key} className={`flex flex-col m-5 z-30 p-3 cursor-pointer`}>
      <Link href={`/product/${pizza._id}`} passHref>
        <Image
          src={pizza.img}
          alt=""
          height={300}
          width={300}
          objectFit="contain"
        />
      </Link>
      <h1 className={`text-lg text-red-400 font-bold text-center`}>
        {pizza.title}
      </h1>
      <h2 className={`text-center font-semibold font-[#666]`}>
        <span className={`mr-1`}>RM</span>
        {pizza.prices[0]}
      </h2>
      <p className={`text-sm font-medium text-center font-[#777]`}>
        {pizza.desc}
      </p>
    </div>
  );
}

export default PizzaCard;
