"use client";
import React from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { useConversion } from "@/data-access/conversion";
import Backwards from "./ui/Backwards";
import { useParams } from "next/navigation";
import { SingleClassSkeleton } from "./SingleClassroom";
import { IsingleClass, ClassInfo, Iannoucement } from "./SingleClassroom";
import Image from "next/image";
import { IgetTeachers, Iteacher } from "./AssignDialog";
import Link from "next/link";

interface IResource {
  resourceIds: string[];
}

// component for announcements
export const Announcement: React.FC<{
  info: Iannoucement[];
}> = ({ info }) => {
  return (
    <div className=" bg-white rounded-md py-5 px-5">
      {info.length === 0 ? (
        <div className=" w-full h-full relative flex max-xs:h-[150px] ">
          <p className="text-slate-400 font-semibold text-[12px]">
            Announcement
          </p>
          <p className=" text-green-600 font-bold text-[12px]  absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
            No announcement yet
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

// component for displaying class details
const ClassDetails: React.FC<{
  info: IsingleClass;
}> = ({ info }) => {
  const flattendTeacher: IgetTeachers[] = info.SchoolClassTeacher.map(
    (teacher: Iteacher) => teacher.teacher
  );
  return (
    <div className=" bg-white p-5 flex flex-col gap-4">
      <p className="text-slate-400 font-semibold text-[12px]">Class Details</p>
      <div className=" flex items-center justify-between">
        <p className=" text-[16px] font-semibold text-slate-600">Subject</p>
        <div className=" flex gap-1 items-center">
          <Image
            className=" w-[20px] h-[20px] aspect-square rounded-md"
            src={`/${info?.subject.toLowerCase()}.png`}
            alt=""
            width={200}
            height={200}
          />
          <p className=" text-[12px] font-bold">{info.subject}</p>
        </div>
      </div>
      <div className=" flex items-center justify-between">
        <p className=" text-[16px] font-semibold text-slate-600">
          Total student
        </p>
        <p className="text-[12px] font-bold">
          {info.SchoolClassStudent.length}
        </p>
      </div>
      <div className=" flex flex-col">
        <p className=" text-slate-400 font-semibold">Teachers</p>
        <div className=" mt-1 flex flex-col gap-1 ">
          {flattendTeacher.map((teacher, index) => (
            <div className=" items-center flex gap-1 " key={index}>
              <Image
                src={teacher.profilePhoto}
                alt=""
                width={200}
                height={200}
                className=" w-[25px] h-[25px] rounded-full  "
              />
              <p className=" text-[12px]">{teacher.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
// this component below shows the exam in the class
export const Exams: React.FC<{ exams: any[] }> = ({ exams }) => {
  return (
    <div className=" flex-1 flex flex-col gap-2 bg-white rounded-md p-5">
      <p className=" text-slate-500 font-semibold">Exams</p>
      {exams.length === 0 ? (
        <div className=" w-full flex items-center justify-center flex-col gap-2">
          <Image
            src="/noitem.avif"
            alt="no-item"
            width={200}
            height={200}
            className=" w-[200px] aspect-square rounded-md"
          />
          <p className=" text-slate-500 font-semibold">No exams yet</p>
        </div>
      ) : (
        <div className=" w-full flex flex-col gap-2 px-5">
          <p>hello</p>
        </div>
      )}
    </div>
  );
};
export const Resources: React.FC<{ resourcesIds: any[] }> = ({
  resourcesIds,
}) => {
  const { getTimeAgo } = useConversion();
  const validResourcesIds = Array.isArray(resourcesIds) ? resourcesIds : [];
  const handleViewLink = (link: string) => {
    return (window.location.href = link);
  };

  const queries = useQueries({
    queries: validResourcesIds.map((id) => ({
      queryKey: ["resource", id],
      queryFn: async () => {
        const response = await fetch(`/api/get-single-resources/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch resource");
        }
        return response.json();
      },
    })),
  });

  // check if there is still any student we are fetching
  const checkFetching = queries.some((item) => item.isLoading);
  if (checkFetching) {
    return <div>loading...</div>;
  }

  const arrayOfResource = queries.map((item) => item.data);
  const AvaliableResources = arrayOfResource.filter(
    (resource) => resource !== null
  );

  return (
    <div className="flex-1 flex flex-col gap-2 bg-white rounded-md p-5">
      <p className="text-slate-500 font-semibold">Resources</p>
      {arrayOfResource.length === 0 ? (
        <div className="w-full flex items-center justify-center flex-col gap-2">
          <Image
            src="/noitem.avif"
            alt="No resources"
            width={200}
            height={200}
            className="w-[200px] aspect-square rounded-md"
          />
          <p className="text-slate-500 font-semibold">No resources yet</p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2">
          {AvaliableResources?.map((resource: any, index) => (
            <div
              key={index}
              className="border flex justify-between  rounded-md p-3"
            >
              <div className=" flex  flex-col">
                <p className=" text-black font-bold text-[13px] md:text-[16px]">
                  {resource?.subject}
                </p>
                <p className=" text-black font-bold text-[12px] md:text-[14px]">
                  {resource?.title}
                </p>
                <div className="text-black font-bold text-[12px] md:text-[13px]">
                  {resource?.grade}
                </div>

                <p className=" text-slate-600  text-[12px]">
                  {getTimeAgo(resource?.createdAt)}
                </p>
              </div>

              <div
                onClick={() => handleViewLink(resource?.sourceLink as string)}
                className="max-ss:text-[12px] my-auto bg-green-700 text-white  px-2 md:px-4 py-2 rounded-md cursor-pointer "
              >
                {" "}
                View Resource
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// the shared class heading and backwards
export const SingleTop = () => {
  return (
    <div className=" w-full flex items-center justify-between">
      <p className=" font-bold text-black">Details</p>
      <Backwards />
    </div>
  );
};
// our component base starts here
const StudentSchoolClass = () => {
  const { id } = useParams();
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["school-student-class"],
    queryFn: async () => {
      const response = await fetch(`/api/class-action/single-class?id=${id}`);
      const result = await response.json();
      return result;
    },
  });

  //   checking if loading is true
  if (isFetching) {
    return (
      <div className=" mt-6">
        <SingleClassSkeleton />;
      </div>
    );
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  const items: IsingleClass = data;
  return (
    <div className=" mt-6 flex flex-col gap-3">
      <SingleTop />
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
        <ClassInfo info={items} />
        <Announcement info={items.AnnouncementBySchoolClass} />
        <ClassDetails info={items} />
      </div>
      <div className=" w-full flex flex-col md:flex-row gap-3">
        <Exams exams={items.SchoolClassExam} />
        <Resources resourcesIds={items.resourcesIds} />
      </div>
    </div>
  );
};

export default StudentSchoolClass;
