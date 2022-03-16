import Image from "next/image";
function Footer() {
  return (
    <div className={`h-screen-[100px] flex bg-[#222]`}>
      <div className={`flex flex-[0.7] lg:flex-[0.3] relative`}>
        <Image src="/img/bg.png" objectFit="contain" layout="fill" alt="" />
      </div>
      <div className={`flex flex-col lg:flex-row flex-[0.3] lg:flex-[0.7] p-5`}>
        <div className={`flex-1 px-5`}>
          <h2 className={`text-[#d3d3d3]`}>
            OH YES, WE DID.THE BEST PIZZA IN SELANGOR, WELL BAKED SLICE OF
            PIZZA.
          </h2>
        </div>
        <div className={`flex-1 px-5 items-center justify-center space-y-3`}>
          <h1 className={`text-lg text-[#b7903c] font-bold my-1`}>
            FIND OUR RESTAURANTS
          </h1>
          <p className={`text-[#d3d3d3]`}>
            1654 R. Don Road #304.
            <br /> Sungai Besar, 545300
            <br /> (603) 3224-1234
          </p>
          <p className={`text-[#d3d3d3]`}>
            2356 K. Besar Road #235.
            <br /> Sungai Besar, 45300
            <br /> (603) 3224-1011
          </p>
          <p className={`text-[#d3d3d3]`}>
            2318 K. King Road #235.
            <br /> Sungai Besar, 45300
            <br /> (603) 3224-1012
          </p>
          <p className={`text-[#d3d3d3]`}>
            1614 W. Queen Road St #125.
            <br /> Sungai Besar, 45300
            <br /> (603) 3224-1013
          </p>
        </div>
        <div className={`flex-1 px-5 items-center justify-center space-y-3`}>
          <h1 className={`text-lg text-[#b7903c] font-bold my-1`}>
            WORKING HOURS
          </h1>
          <p className={`text-[#d3d3d3]`}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={`text-[#d3d3d3]`}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 00:00
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
