import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg">
      <nav>
        <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap">
          <div className="flex-col items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none md:flex-1"></div>
          <div className="flex items-center justify-between w-full md:w-auto text-4xl">
            <Link href="/">
              <h1>Netz98</h1>
            </Link>
          </div>
          <div className="flex-col items-center justify-start order-2 hidden w-full md:flex md:flex-row md:w-auto md:flex-1 md:order-none"></div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
