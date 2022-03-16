import { useRouter } from "next/router";
import Image from "next/image";

function OrderList({ key, id, customer, total, status, createdAt }) {
  const router = useRouter();

  function renderStatus() {
    if (status < 1)
      return (
        <div className="">
          <Image
            src="/img/bake.png"
            objectFit="contain"
            width={25}
            height={25}
            alt="preparing"
            className="animate-pulse"
          />
          <h2 className="text-red-500">Preparing</h2>
        </div>
      );
    if (status === 1) {
      return (
        <div>
          <Image
            src="/img/bake.png"
            objectFit="contain"
            width={25}
            height={25}
            alt="preparing"
            className="animate-pulse"
          />
          <h2 className="text-yellow-500">On the Way</h2>
        </div>
      );
    }
    if (status > 1) {
      return (
        <div>
          <Image
            src="/img/delivered.png"
            objectFit="contain"
            width={25}
            height={25}
            alt="preparing"
            className="animate-pulse"
          />
          <h2 className="text-green-500">Delivered</h2>
        </div>
      );
    }
  }

  const navOrderDetails = () => {
    router.push(`/orders/${id}`);
  };
  return (
    <div
      onClick={navOrderDetails}
      key={key}
      className={`flex flex-col m-5 z-30 p-3 cursor-pointer shadow-lg`}
    >
      <h1>{customer}</h1>
      {renderStatus()}
      <p className="text-sm text-gray-400">{createdAt}</p>
    </div>
  );
}

export default OrderList;
