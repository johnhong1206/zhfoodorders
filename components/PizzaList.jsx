import PizzaCard from "./PizzaCard";

function PizzaList({ pizzaList }) {
  return (
    <div className={`flex flex-col items-center px-[10px] py-[20px]`}>
      <h1 className={`text-xl font-bold text-gray-600`}>
        THE BEST PIZZA IN TOWN
      </h1>
      <p className={`text-xl w-3/4 text-center`}>
        This is the Best Pizza in the Town, thar provide multiple flavors of
        pizza
      </p>
      <div className=" grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  p-2">
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}

export default PizzaList;
