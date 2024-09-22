"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";


function Navbar() {
  return (
    <nav className="p-4 md:p-6  bg-gray-600 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="/" className="text-xl font-bold mb-4 md:mb-0">
          The Data Taskers
        </a>

       <Link href={"/"}>
       <Button
          className="w-full md:w-auto bg-slate-100 text-black"
          variant="outline"
        >
          Contacts
        </Button>
       </Link>
      </div>
    </nav>
  );
}

export default Navbar;
