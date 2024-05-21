import Students from "@/components/Students";
import React from "react";
import { AddStudent } from "./add/page";

const page = () => {
  return (
    <div>
      <div className="flex overflow-auto mt-6 justify-end items-center font-header font-semibold text-[13px]">
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">All Status</p>
        </div>
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">Active</p>
        </div>
        <div className="flex ">
          <input
            type="checkbox"
            className="accent-lightGreen text-white mr-1"
          />
          <p className="mr-3">Offline</p>
        </div>
        <AddStudent />
      </div>
      <Students />
    </div>
  );
};

export default page;
