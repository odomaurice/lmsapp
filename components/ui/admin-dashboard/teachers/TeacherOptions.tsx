"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FaEllipsisH } from "react-icons/fa";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
// import RemoveClass from "./RemoveClass";
import { IoMailUnreadOutline } from "react-icons/io5";
import UpdateTeacherStatus from "./UpdateTeacherStatus";
import ChangeRole, { SendSingleMail } from "./ChangeRole";
import { LuListRestart } from "react-icons/lu";
import "react-toastify/dist/ReactToastify.css";

interface ITeacher {
  dataId: string;
  email: string;
}

const TeacherOptions: React.FC<ITeacher> = ({ dataId, email }) => {
  const [ismailOpen, setismailOpen] = useState<boolean>(false);
  const [updateStatusDialogOpen, setUpdateStatusDialogOpen] =
    useState<boolean>(false);
  const [changeRoleDialogOpen, setChangeRoleDialogOpen] =
    useState<boolean>(false);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="border-none bg-slate-100" variant="outline">
          <FaEllipsisH className="ml-3 text-lightGreen" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="grid gap-4 font-header">
          <div className="grid gap-2">
            <div className="flex justify-start">
              <Link href={`/admin-dashboard/teachers/${dataId}`}>
                <p className="inline text-[13px] font-semibold">
                  <FaRegEye className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
                  View
                </p>
              </Link>
            </div>
            <hr className="bg-black" />
            <div className="flex justify-start">
              <div
                onClick={() => setismailOpen(true)}
                className=" flex items-center text-[13px]  font-semibold"
              >
                <IoMailUnreadOutline className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
                <p>Send Email</p>
              </div>
              <SendSingleMail
                ismailOpen={ismailOpen}
                setIsmailOpen={setismailOpen}
                email={email}
              />
            </div>
            <hr className="bg-black" />
            <Link
              href={`/admin-dashboard/teachers/attendance/${dataId}`}
              className=" flex items-center text-[13px]  font-semibold"
            >
              <LuListRestart className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
              <p>Attendance</p>
            </Link>
            <hr className="bg-black" />
            {/* Update Status Dialog Trigger */}
            <div
              onClick={() => setUpdateStatusDialogOpen(true)}
              className="flex justify-start cursor-pointer"
            >
              <UpdateTeacherStatus
                setDialogOpen={setUpdateStatusDialogOpen}
                dialogueOpen={updateStatusDialogOpen}
                isRole={true}
                dataId={dataId}
              />
            </div>
            <hr className="bg-black" />

            {/* Change Role Dialog Trigger */}
            <div
              onClick={() => setChangeRoleDialogOpen(true)}
              className="flex justify-start cursor-pointer"
            >
              <ChangeRole
                setDialogOpen={setChangeRoleDialogOpen}
                dialogueOpen={changeRoleDialogOpen}
                isRole={true}
                dataId={dataId}
              />
            </div>
            <hr className="bg-black" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TeacherOptions;
