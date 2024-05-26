import React from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

interface TeacherSubjectProps {
  onClickTeacherDetails: (view: string) => void;
}

const TeacherProfileData: React.FC<TeacherSubjectProps> = ({
  onClickTeacherDetails,
}) => {
  const handleSubjectView = () => {
    onClickTeacherDetails("subject");
  };

  return (
    <section>
      <Container>
        <div>
          <div className="flex justify-between items-center mb-5">
            <span className="font-bold">Details</span>
            <Link
              href="/teacher-dashboard/one-on-one-section"
              className="cursor-pointer"
            >
              <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
            </Link>
          </div>
          <div className="flex flex-col md:flex-row mb-[50px]">
            <div>
              <div className="flex gap-10">
                <span className="bg-[#359C71] px-[7px] rounded-full text-white">
                  1
                </span>
                <p className="text-[#359C71] font-bold">Profile Data</p>
              </div>
              <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
              <div className="flex gap-10">
                <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                  2
                </span>
                <p>Subject and Preferences</p>
              </div>
              <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
              <div className="flex gap-10">
                <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                  3
                </span>
                <p>Pricing Details</p>
              </div>
            </div>
            <div>
              <div className="flex flex-col pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
                <p className="font-bold text-[18px]">
                  Edit Your Teachers Profile !
                </p>
                <div className="flex items-center gap-3 my-4">
                  <Image
                    src="/teacher1.png"
                    width={100}
                    height={100}
                    className="rounded-full"
                    alt="Teacher Picture"
                  />
                  <div>
                    <span className="text-[16px] font-bold">
                      David Olushola
                    </span>
                    <div className="flex bg-[#FFFFFF] w-fit p-2">
                      <Image
                        src="/svgs/upload.svg"
                        width={15}
                        height={15}
                        alt="UplaodImage"
                      />
                      <input type="file" name="upload" />
                    </div>
                  </div>
                </div>
                <textarea
                  rows={5}
                  cols={7}
                  className="p-4 mb-4 outline-none my-1"
                  placeholder="About Yourself as a tutor"
                ></textarea>
                <Button
                  onClick={handleSubjectView}
                  className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3"
                >
                  Proceed
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TeacherProfileData;
