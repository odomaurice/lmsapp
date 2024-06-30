import Image from "next/image";
import { ISessionSub } from "./Duration";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { BsClipboard2PlusFill } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { ScrollArea } from "@/components/ui/scroll-area";

const SessionDetails: React.FC<ISessionSub> = ({
  register,
  errors,
  control,
}) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => (prevCount += 1));
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount -= 1));
  };
  return (
    <ScrollArea className="h-[500px] w-full ">
      <div className="">
        <div className="flex justify-between">
          <h3 className="text-xl ml-6 font-bold">Book Session</h3>
        </div>
        <div className="flex  mx-auto mt-8 mb-6 flex-col gap-3">
          <p className="text-lightGreen text-[15px] ml-8 font-semibold">
            Select Session Type
          </p>
          <p className="text-[14px] ml-8 font-semibold">
            Choose a session that satisfies your need.
          </p>
        </div>

        <div className="space-y-4 md:mb-0 mb-8 my-2">
          {/* first child */}
          <div className="border md:ml-6 px-4 bg-white justify-between md:pl-4 md:pr-6 flex py-3  rounded-md ">
            <div className="flex space-x-6">
              <Image
                src="/book-1.png"
                alt="paystack"
                width={100}
                height={100}
                className="w-[35px] h-[35px]"
              />
              <div className="flex space-y-1 flex-col">
                <p className="text-[13px] font-semibold">Session Type</p>
                <p className="text-[11px]">1 on 1 Sessions</p>
              </div>
            </div>

            <input
              {...register("privateSession")}
              className="w-4 ml-4 accent-lightGreen"
              type="checkbox"
            />
          </div>
          {/* second child */}
          <div className="border px-4  md:ml-6 bg-white  justify-between md:pl-4 md:pr-6 flex py-3  rounded-md ">
            <div className="flex space-x-6">
              <Image
                src="/book-2.png"
                alt="flutterwave"
                width={100}
                height={100}
                className="w-[40px] h-[40px]"
              />
              <div className="flex space-y-1 flex-col">
                <p className="text-[13px] font-semibold">Session Type</p>
                <p className="text-[11px]">Homework Support</p>
              </div>
            </div>

            <input
              {...register("homeworkSupport")}
              className="w-4 ml-4 accent-lightGreen"
              type="checkbox"
            />
          </div>
          {/* Third child */}
          <div className="border md:ml-6 px-4 bg-white justify-between md:pl-4 md:pr-6 flex py-3  rounded-md ">
            <div className="flex space-x-6">
              <Image
                src="/book-3.png"
                alt="remitta"
                width={100}
                height={100}
                className="w-[35px] h-[35px]"
              />
              <div className="flex space-y-1 flex-col">
                <p className="text-[13px] font-semibold">Session Type</p>
                <p className="text-[11px]">Group Sessions</p>
              </div>
            </div>

            <input
              {...register("groupSessions")}
              className="w-4 ml-4 accent-lightGreen"
              type="checkbox"
            />
          </div>
          <div className="border ml-6  justify-between px-3 flex py-3  rounded-md ">
            <FaMinus onClick={decrement} className="text-2xl" />

            <div className="flex  space-y-2 flex-col">
              <p className="text-[13px]">Number of Sessions</p>
              <p className="font-semibold mx-auto">
                <input
                  {...register("sessionNumber")}
                  type="hidden"
                 
                  className="bg-stone-100 text-center"
                /> {count}
              </p>
            </div>

            <FaPlus onClick={increment} className="text-xl" />
          </div>{" "}
          <p className="text-center font-semibold text-2xl text-lightGreen">
            $10.00
          </p>
        </div>
      </div>
    </ScrollArea>
  );
};

export default SessionDetails;
