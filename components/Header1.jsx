import Image from "next/image";
import Block from "./Block";
import { useState, useEffect } from "react";
// import Cookies from "js-cookie";

const Header1 = () => {
  //   const [auth, setAuth] = useState(false);

  //   useEffect(() => {
  //     const key = Cookies.get("user");
  //     if (key) {
  //       setAuth(true);
  //       return;
  //     }
  //     setAuth(false);
  //   }, [auth]);

  return (
    <div className="flex justify-between border-b-2 border-gray-300 items-center h-24 px-10">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={200}
        height={200}
        className="w-28 h-28"
      />

      <div className="h-full flex">
        <Block
          image={"/bag.svg"}
          title={"Become a member"}
          para={"Additional 10% off on stays."}
        />
        <Block
          image={"/bag.svg"}
          title={"OYO for business"}
          para={"Trusted by 5000 Corporates."}
        />
        <Block
          image={"/hotel.svg"}
          title={"List your property"}
          para={"Start earning in 30 min."}
        />
        <Block
          image={"/call.svg"}
          title={"9359164626"}
          para={"Call us to Book now."}
        />

        <div className="flex items-center px-3">
          <Image
            src={"/demo.svg"}
            width={200}
            height={200}
            alt="demo"
            className="w-10 h-10 rounded-full mr-5"
          />
          <h3 className="font-bold cursor-pointer">Login / Signup</h3>
        </div>
      </div>
    </div>
  );
};

export default Header1;
