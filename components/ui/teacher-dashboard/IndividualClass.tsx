


"use client";
 import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


import { Button } from "@/components/ui/button"
import { FaEllipsisH } from "react-icons/fa";
import Link from "next/link"
import RemoveClass from "./RemoveClass";
import { FaTableList } from "react-icons/fa6";
import { ListCollapse } from "lucide-react";

interface Idelete {
  dataId: string
}


const IndividualClass: React.FC<Idelete> = ({dataId}) => {
  return (
    <Popover >
    <PopoverTrigger asChild >
    <Button className="border-none" variant="outline">
      <FaEllipsisH className="ml-3 " />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-40">
      <div className="grid gap-4 font-subtext">
        <div className="grid gap-2">
          <div className="flex justify-start">
            <Link href={`/teacher-dashboard/classroom/individual-session/${dataId}`}>
              <p className="inline text-[14px]  font-semibold">
                <ListCollapse className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
                Details
              </p>
            </Link>
          </div>
          <hr className="bg-black" />
          <div className="flex justify-start">
            <RemoveClass dataId={dataId}/>
          </div>
          <hr className="bg-black" />
        </div>
      </div>
    </PopoverContent>
  </Popover>
  );
}

export default IndividualClass
