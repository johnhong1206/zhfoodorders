import dynamic from "next/dynamic";

//spring
import { useSpring, animated } from "react-spring";
//icons

//components
const MenuContent = dynamic(() => import("./MenuContent"));

function Menu() {
  const extend = useSpring({
    transform: "translateX(0px)",
    from: { transform: "translateX(100%)" },
  });
  return (
    <animated.div
      style={extend}
      className="w-full md:w-9/12 lg:w-6/12 xl:w-4/12 h-screen fixed z-50 top-0 right-0 bg-gray-400 flex flex-col items-center justify-center"
    >
      <MenuContent />
    </animated.div>
  );
}

export default Menu;
