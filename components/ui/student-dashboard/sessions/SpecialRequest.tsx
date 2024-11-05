"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../button";
import DashboardPagination from "../../../DashboardPagination";
import Container from "../../../Container";
import { OneOnOneList } from "@/constants/oneOnOneList";
import { useQuery } from "@tanstack/react-query";
import { MdContentCopy } from "react-icons/md";
import { useCopy } from "@/data-access/copy";
import { FaRegClock } from "react-icons/fa";
import { useConversion } from "@/data-access/conversion";
import { IoIosRadio } from "react-icons/io";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { Noitem } from "../../../ApplicantsTable";

interface Iteacher {
  name: string;
  email: string;
  profilePhoto: string;
  
}
// interface for the type we are getting from backend
interface ISpecialRequest {
    amt: string;
    grade: string;
    language: string;
    studentId: string;
    subject: string;
    time: string;
    teacher: Iteacher;
      
  
  
}

interface IoneonOne {
  AppliedSection: ISpecialRequest[];
  
}




const StartMeetingDiv: React.FC<{ subject: string; language: string}> = ({
  subject,
  language
 
}) => {
  return (
    <div className=" flex  gap-1 mx-auto items-center">
      <div className=" flex  text-[12px] items-center gap-1 px-3 py-1 rounded-md bg-[tomato] text-center w-fit text-white">
        {subject}
      </div>
      <div className=" flex  text-[12px] items-center gap-1 px-3 py-1 rounded-md bg-lightGreen text-center w-fit text-white">
        {language}
      </div>
      
    </div>
  );
};

const TimeShow: React.FC<{
 
  time: string;
}> = ({  time }) => {
 
  return (
    <div className=" flex flex-col items-start gap-2 pl-3">
      <div className=" flex gap-3 items-center">
        <FaRegClock className=" text-gray-500" />
        <p className="text-[14px]">Time: {time}</p>
      </div>
      
      
    </div>
  );
};
// start meeting btn
const JoinSession = () => {
  

  return (
    <div className=" w-full flex gap-2 px-3">
      
      <div className=" flex-1 flex gap-2 py-3 text-[14px] items-center justify-center bg-[tomato] text-white rounded-md cursor-pointer hover:bg-[#fd7e62] transition-all ease-in-out duration-700 ">
        <IoIosRadio />
        <p>Join Session</p>
      </div>
    </div>
  );
};
// each session component here
const EachSession: React.FC<{ item: ISpecialRequest}> = ({
  item,
 
}) => {

   
  return (
    <div className=" py-2 px-2 rounded-md bg-white shadow-md flex flex-col gap-2">
     <div className=" flex justify-between items-center">
      <div className=" flex items-start gap-2">
        <Image
          src={item.teacher?.profilePhoto ||  ""}
          alt="ProfileDp"
          width={200}
          height={200}
          className=" w-[50px] h-[60px] rounded-md"
        />
        <div className=" flex flex-col ">
          <p className="font-bold mt-3 text-[14px] ">{item.teacher?.name || ""}</p>
          
        </div>
      </div>
      <div className=" bg-green-200 text-green-800 px-2 py-1 font-bold text-[12px] rounded-md">
        <p>{item.grade || ""}</p>
      </div>
    </div>
      <StartMeetingDiv subject={item.subject} language={item.language}  />
      <TimeShow
        time={item.time}
        
      />
       <JoinSession />
    </div>
  );
};

export const SessionLoadings = () => {
  const dummyArrays = new Array(6).fill("");
  return (
    <div className=" w-full flex flex-col gap-3 max-ss:mt-[90px]">
     
       
     
      <div className=" gap-2 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {dummyArrays.map((dummy, index) => (
          <Skeleton
            key={index}
            animation="wave"
            variant="rectangular"
            height={300}
            className=" rounded-md"
          />
        ))}
      </div>
    </div>
  );
};


const SessionHeading = () => {
  return (
    <div className=" flex w-full items-center justify-center mb-3 font-semibold text-black">
      <p>Special Requests for sessions</p>
    </div>
  );
};
const SpecialRequest = () => {
    const { data: session } = useSession();
    const studentId = session?.user?.id; 
    console.log(studentId);
  // here we can now fetch our session
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["getSpecialRequest"],
    queryFn: async () => {
      const response = await fetch(`/api/student-special-request?studentId=${studentId}`);
      const result = await response.json();
      return result;
    },
  });

  console.log(data)

  if (isFetching) return <SessionLoadings  />;
  if (isError)
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );

  const oneOneOneData: ISpecialRequest[] = data;
  

  return (
    <section className="my-[80px] md:my-4">
      <Container>
        <SessionHeading/>
        <div>
          {Array.isArray(oneOneOneData) && (
            <div>
              {oneOneOneData.length === 0 ? (
                <div>
                  <Noitem desc="No Session at the moment" />
                </div>
              ) : (
                <div className=" w-full grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {oneOneOneData.map((item, index) => (
                    <EachSession
                      key={index}
                      item={item}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default SpecialRequest;
