"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import {
  SingleRowNoArray,
  SingleRowWithArray,
} from "./ui/admin-dashboard/sessions/SingleSessionAdmin";
import { useConversion } from "@/data-access/conversion";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Noitem } from "./ApplicantsTable";
import { SingleClassSkeleton } from "./SingleClassroom";
import AddTest from "./ui/teacher-dashboard/AddTest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddResource from "./ui/teacher-dashboard/AddResource";
import Link from "next/link";
import { AddMettingModel } from "./ui/student-dashboard/sessions/OneOnOneSession";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Noprofile } from "./ui/admin-dashboard/sessions/Sessions";
import { DownSection } from "./SingleSessionShow";

interface IMeetingLink {
  link: string;
}

interface RemoveExamProps {
  sessionId: string;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// interface for the session
interface ISingleSession {
  id: string;
  subject: string;
  grade: string;
  language: string;
  time: string;
  resources: string[];
  amt: number;
  createdAt: string;
  updatedAt: string;
  teacher: {
    name: string;
    email: string;
    profilePhoto: string;
    phoneNo: string;
  };
  student: {
    name: string;
    email: string;
    gender: string;
    grade: string;
    profilePhoto: string;
    phoneNo: string | null;
    disable: string;
  };
  StudentExam: any[];
  SpecialRequestMeeting: IMeetingLink;
}

// the top left session
export const TopLeftSession: React.FC<{
  dp: string;
  name: string;
  grade: string;
  contact: string;
  isTeacher: boolean;
  link: IMeetingLink;
}> = ({ dp, name, grade, contact, isTeacher, link }) => {
  //console.log(link, contact);
  const { id } = useParams();
  const [showModel, setShowmodel] = useState<boolean>(false);
  return (
    <div className=" flex flex-col gap-3">
      <div className=" px-4 py-3 rounded-md bg-white flex gap-4">
        {dp ? (
          <Image
            src={dp}
            alt="dp"
            width={200}
            height={200}
            priority
            className=" w-[100px] aspect-square rounded-md"
          />
        ) : (
          <div>
            <Noprofile />
          </div>
        )}
        <div className=" flex flex-col gap-2">
          <p className=" text-black font-semibold text-[12px]">{name}</p>
          <p className="  text-slate-700 font-semibold text-[12px] ">{grade}</p>
          <div className=" w-full px-4 py-2 bg-green-800 text-[12px] text-white rounded-md flex items-center gap-2  ">
            <FaPhoneAlt />
            <p>{contact}</p>
          </div>
        </div>
      </div>
      {/* {!isTeacher && (
        <div className=" w-full flex flex-col gap-2 bg-white rounded-md px-4 py-3">
          <p className=" text-[14px] font-bold">Teachers Desc</p>
        </div>
      )} */}
      {isTeacher && link && (
        <div>
          <button
            onClick={() => setShowmodel(true)}
            className=" w-fit px-2 py-2 border border-green-900 text-[10px] rounded-md hover:bg-green-700 hover:text-white transition-all ease-in-out duration-700"
          >
            Edit class Link
          </button>
          <AddMettingModel
            id={id as string}
            showModel={showModel}
            setShowmodel={setShowmodel}
            uploadType="specialReques"
            isCreate={false}
          />
        </div>
      )}
    </div>
  );
};
// the top middle session
export const TopMiddleSession: React.FC<{
  time: string;
  amt: number;
  mergedday: string;
  grade: string;
}> = ({ time, amt, mergedday, grade }) => {
  const { handleDate } = useConversion();
  return (
    <div className=" h-fit bg-white px-4 py-2 rounded-md flex flex-col gap-3">
      <div className=" flex flex-col gap-1">
        <SingleRowNoArray name="Grade" value={grade} />
        <SingleRowNoArray name="Duration" value={time} />
        <SingleRowNoArray name="AMT" value={"$" + amt} />
        <SingleRowNoArray name="Merged day" value={handleDate(mergedday)} />
      </div>
    </div>
  );
};

const SubjectsDiv: React.FC<{ subject: string }> = ({ subject }) => {
  const firstItem = subject.split(" ")[0];
  return (
    <div className=" flex items-center gap-2">
      <Image
        src={
          firstItem === "Sciences"
            ? "/physics.png"
            : `/${firstItem.toLowerCase()}.png`
        }
        alt="subject"
        width={200}
        height={200}
        className=" w-[25px] aspect-square"
      />
      <p className=" text-[14px] font-bold">{subject}</p>
    </div>
  );
};
// the top right session
export const TopRightSession: React.FC<{
  subject: string;
  disable: string;
}> = ({ subject, disable }) => {
  const subjectsArray: string[] = ["English", "Physics", "Biology"];
  return (
    <div className=" rounded-md bg-white px-4 py-2 h-fit flex flex-col gap-2">
      <div className=" w-full flex items-center justify-center">
        <div className=" w-fit px-3 py-1 rounded-md bg-[tomato] text-white text-[12px] font-bold">
          <p>More Details</p>
        </div>
      </div>
      {/* subject div */}
      <div>
        <p className="  font-bold underline text-green-700">Subject:</p>
        <div className=" flex flex-col gap-1">{subject}</div>
      </div>
      {/* specialNeed div */}
      <div className=" flex flex-col gap-1 bg-green-300 px-1 overflow-x-hidden py-2 rounded-md">
        <p>{disable ? disable : "No Special Need(s)"}</p>
      </div>
    </div>
  );
};

// the top section div div
export const TopSection: React.FC<{
  infos: ISingleSession;
  isTeacher: boolean;
}> = ({ infos, isTeacher }) => {
  return (
    <div className=" grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <TopLeftSession
        dp={isTeacher ? infos.student.profilePhoto : infos.teacher.profilePhoto}
        name={isTeacher ? infos.student.name : infos.teacher.name}
        grade={infos.grade}
        contact={isTeacher ? infos.student.phoneNo! : infos.teacher.phoneNo!}
        isTeacher={isTeacher}
        link={infos.SpecialRequestMeeting}
      />
      <TopMiddleSession
        grade={infos.grade}
        time={infos.time}
        amt={infos.amt}
        mergedday={infos.createdAt}
      />
      <TopRightSession
        subject={infos.subject}
        disable={infos.student.disable}
      />
    </div>
  );
};

//The Dialog that deletes the exam
const RemoveExam: React.FC<RemoveExamProps> = ({
  sessionId,
  setDialogOpen,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a delete using mutation to the backend
  const { mutate } = useMutation({
    mutationFn: async (sessionId: string) => {
      const result = await fetch(`/api/class/announcement`, {
        method: "DELETE",
        body: JSON.stringify({
          sectionId: sessionId,
        }),
      });
      return result;
    },

    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["get-single-class-teacher"] });
      if (result.ok) {
        const body = await result.json();
        setLoading(false);
        setDialogOpen(false);
        return toast({
          variant: "default",
          title: "Successfully Deleted!!!",
          description: body.message,
          className: " bg-green-500 text-white",
        });
      } else {
        setLoading(false);
        return toast({
          variant: "destructive",
          title: "Update error",
          description: "Error updating this teacher's status",
        });
      }
    },
  });
  const handleDelete = () => {
    setLoading(true);
    mutate(sessionId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p
          onClick={() => setDialogOpen(true)}
          className="inline text-[13px] cursor-pointer  font-semibold"
        >
          <Trash2 className="inline w-4 h-4 mr-2 ml-0 text-lightGreen " />
        </p>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Delete Exam</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="flex flex-1 items-center justify-center mx-auto gap-2">
            <Image
              src="/warn.png"
              alt="warning"
              width={200}
              height={100}
              className="w-[50px]"
            />
          </div>
          <div className="grid  items-center font-header gap-4">
            <p className="font-bold text-[18px]  ">
              Are you sure you want to delete exam?
            </p>
            <p className="text-sm">
              This action can not be reversed, be sure you want to remove before
              you confirm
            </p>
          </div>
        </div>
        <DialogFooter className="">
          <Button
            onClick={handleDelete}
            disabled={loading}
            type="submit"
            className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700"
          >
            {loading ? "Deleting Exam..." : "Delete Exam"}
          </Button>
        </DialogFooter>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

const RenderedExam: React.FC<{
  exam: any;
  examType: string;
  isTeacher: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogOpen: boolean;
}> = ({ exam, examType, isTeacher, setDialogOpen, dialogOpen }) => {
  // const { data } = useSession();
  //     const router = useRouter();
      
  //     // New state to track if the exam should start
  //       const [examStarted, setExamStarted] = useState(false);
    
  //     // lets push to the exam page for student to start exam
  //     const handleMoveToExam = (id: string) => {
  //       console.log(id);
  //       setExamStarted(true); // Set exam started to true
  //       router.push(
  //         `/student-dashboard/sessions/start-exam/?examId=${id}&examType=${examType}&examStarted=true`
  //       );
        
  //     };
  
  return (
    <div className=" w-full flex items-center text-[14px] font-semibold text-slate-500">
      <div className=" flex-1 flex items-center text-black text-[14px] gap-1 ">
        <Image
          src={`/${exam?.subject.toLowerCase()}.png`}
          alt="subject"
          width={200}
          height={200}
          className=" w-[25px] aspect-square"
        />
        <p>{exam.subject}</p>
      </div>
      <div className=" flex-1 flex items-center">
        <div className=" flex-1 flex text-[11px] items-center justify-center">
          <p>{exam.title}</p>
        </div>
        <div className=" flex-1 flex text-[11px] items-center justify-center">
          <p>{exam.grade}</p>
        </div>

        {/* <div className=" flex-1 flex text-[11px] items-center justify-center">
          {!isTeacher && exam.completed || exam.score !== null ? (
            <div className="max-ss:text-[12px] bg-slate-500 text-slate-300 rounded-md px-2 md:px-4 py-2 cursor-not-allowed">
              <p>Answered</p>
            </div>
          ) : (
            <div
              onClick={() => handleMoveToExam(exam.id)}
              className="max-ss:text-[12px] bg-green-700 text-white px-2 md:px-4 py-2 rounded-md cursor-pointer"
            >
              <p>Start now</p>
            </div>
          )}
        </div> */}

        
        <div className=" flex-1 flex text-[11px] items-center justify-center">
          <p>
            <RemoveExam sessionId={exam.id} setDialogOpen={setDialogOpen} />
          </p>
        </div>
      </div>
    </div>
  );
};
const Exams: React.FC<{
  exams: any[];
  isTeacher: boolean;
  sessionId: string;
}> = ({ exams, isTeacher, sessionId }) => {
  // state to toggle exam submission for this particular session
  const [dialogueOpen, setDialogOpen] = useState<boolean>(false);
  const [removeExamDialogOpen, setRemoveExamDialogOpen] =
    useState<boolean>(false);
  return (
    <div className=" flex-6 bg-white px-3 py-6 flex flex-col gap-3 h-fit">
      <div className=" w-full flex items-center justify-between">
        <p className=" font-semibold">Assessment </p>
        {isTeacher && (
          <div onClick={() => setDialogOpen(true)}>
            <AddTest
              dialogueOpen={dialogueOpen}
              setDialogOpen={setDialogOpen}
              classId={sessionId}
              isClass={false}
            />
          </div>
        )}
      </div>
      <div className=" w-full flex items-center text-[14px] font-semibold text-slate-500">
        <div className=" flex-1 ">
          <p>Subject</p>
        </div>
        <div className=" flex-1 flex items-center">
          <div className=" flex-1 flex items-center justify-center">
            <p>Title</p>
          </div>
          <div className=" flex-1 flex items-center justify-center">
            <p>Grade</p>
          </div>
          <div className=" flex-1 flex items-center justify-center">
            <p>Delete</p>
          </div>
        </div>
      </div>
      {/* render all the exams below here */}
      {exams.length === 0 ? (
        <Noitem desc={`No Exams yet, ${isTeacher && "add exams"}`} />
      ) : (
        <div className=" flex flex-col gap-2">
          {exams.map((exam, index) => (
            <RenderedExam
              key={index}
              exam={exam}
               examType="special-request-session"
               isTeacher={isTeacher}
              setDialogOpen={setRemoveExamDialogOpen}
              dialogOpen={removeExamDialogOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const EachResources = () => {
  return <div></div>;
};
const Resources: React.FC<{
  resources: string[];
  isTeacher: boolean;
  sessionId: string;
}> = ({ resources, isTeacher, sessionId }) => {
  // state to toggle resource submission for this particular session
  const [dialogueOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <div className=" flex-4  bg-white px-3 py-4">
      <div className=" w-full flex items-center justify-between">
        <p className=" font-semibold">Resources </p>
        {isTeacher && (
          <div onClick={() => setDialogOpen(true)}>
            <AddResource
              classId={sessionId}
              setDialogOpen={setDialogOpen}
              dialogueOpen={dialogueOpen}
              isClass={false}
            />
          </div>
        )}
      </div>
      {/* for table headings */}
      <div className=" flex items-center text-[14px] font-semibold text-slate-500 ">
        <div className=" flex-8 flex items-center">
          <div className=" flex-3">
            <p>Subject</p>
          </div>
          <div className=" flex-7">
            <p>Title</p>
          </div>
        </div>
        <div className=" flex-2">
          <p>View</p>
        </div>
      </div>
      {/* render the resources below here */}
      {resources.length === 0 ? (
        <Noitem desc={`No Resources yet, ${isTeacher && "Add"}`} />
      ) : (
        <EachResources />
      )}
    </div>
  );
};

const SingleSpecialSessionShow: React.FC<{ isTeacher: boolean }> = ({
  isTeacher,
}) => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery<ISingleSession>({
    queryKey: ["single-special-section-show"],
    queryFn: async () => {
      const response = await fetch(
        `/api/teacher-special-request/single-special-request/${id}`
      );
      const result = await response.json();
      return result;
    },
  });
  //console.log(data)

  // return loading while component is still loading
  if (isLoading) {
    return <SingleClassSkeleton />;
  }
  // return error if is error
  if (isError) {
    return (
      <div className=" mt-8 w-full flex items-center justify-center">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className=" w-full flex flex-col gap-3">
      <div className="flex justify-between my-12">
        <p className="font-bold text-lg">Details</p>
        <Link
          href={
            isTeacher
              ? "/teacher-dashboard/sessions"
              : "/student-dashboard/sessions"
          }
          className="cursor-pointer"
        >
          <Image
            src="/closeAlt.svg"
            alt="cancel"
            width={100}
            height={100}
            className="w-[20px] h-[20px]"
          />
        </Link>
      </div>
      <TopSection isTeacher={isTeacher} infos={data!} />
      <DownSection
        isTeacher={isTeacher}
        exams={data?.StudentExam!}
        sessionId={data?.id!}
        resources={data?.resources!}
        specialRequest={true}
      />
      <ToastContainer />
    </div>
  );
};

export default SingleSpecialSessionShow;
