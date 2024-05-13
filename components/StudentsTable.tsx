import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  import Image from "next/image";
  import Link from "next/link";
import { StudentOptions } from "./StudentOptions";
  
  const StudentsType = [
    {
      id: "1",
      icon: "/teacher-img.png",
      name: "Odo Maurice O",
      classrooms: "Daisy, Alpha, Beta",
      active: "Active",
      status: "Student",
      options: "...",
    },
    {
      id: "2",
      icon: "/tutors.jpg",
      name: "Augustine David",
      classrooms: "Daisy, Alpha, Beta",
      pending: "pending",
      status: "Student",
      accept: "Accept",
      reject: "Reject",
    },
  ];
  
  export default function StudentsTable() {
    return (
      <Table className="bg-white overflow-x-auto    rounded-md mt-12">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="">Classrooms</TableHead>
            <TableHead className="text-right">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {StudentsType.map((Student) => (
            <TableRow key={Student.id} className="">
              <TableCell className="font-semibold text-[14px] w-[250px] flex  mr-1">
                <Image
                  src={Student.icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="w-[60px] h-[60px] rounded-md mr-1"
                />{" "}
                <div className="flex ml-1 flex-col">
                  <div>{Student.name}</div>
                  <div className="flex  mt-2 justify-between">
                    <p
                      className={`${
                        Student.active
                          ? "text-[11px] px-[20px] w-28 py-[5px] text-center rounded-md mr-3 bg-lightGreen text-white"
                          : "text-[11px] px-[20px] w-28 py-[5px] text-center rounded-md mr-3 bg-gold text-white"
                      }`}
                    >
                      {Student.active || Student.pending}
                    </p>
                   
                  </div>
                </div>
              </TableCell>
             
              <TableCell className="">{Student.classrooms}</TableCell>
  
              <TableCell className="flex justify-end text-[14px]  text-lightGreen cursor-pointer">
             <StudentOptions/>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  