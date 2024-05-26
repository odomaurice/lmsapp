import React, { useState } from "react";
import { Button } from "./ui/button";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";

interface TeacherPrice {
  onClickTeacherDetails: (view: string) => void;
}

const TeacherSubject: React.FC<TeacherPrice> = ({ onClickTeacherDetails }) => {
  const [inputField, setInputField] = useState<number[]>([0]);

  const handleAddInput = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setInputField([...inputField, inputField.length]);
  };

  const handlePriceView = () => {
    onClickTeacherDetails("price");
  };

  return (
    <section className="my-[80px] md:my-6">
      <Container>
        <div className="flex justify-between items-center mb-5">
          <span className="font-bold">Details</span>
          <Link href="/school-dashboard/job-listing" className="cursor-pointer">
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
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
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
            <form className="flex flex-col pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
              <label className="font-bold text-[16px]">Session Details</label>
              <div>
                <div className="flex justify-between items-center my-2 p-4 outline-none rounded-[8px] w-full md:w-[40vh] lg:w-[70vh] bg-white">
                  <input
                    type="text"
                    name="text"
                    placeholder="English"
                    className="outline-none w-full pr-4"
                  />
                  <Image
                    src="/svgs/lock.svg"
                    width={15}
                    height={15}
                    alt="Lock"
                  />
                </div>
                <div className="flex justify-between items-center my-2 p-4 outline-none rounded-[8px] w-full md:w-[40vh] lg:w-[70vh] bg-white">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/svgs/calculate.svg"
                      width={20}
                      height={20}
                      alt="Lock"
                    />
                    <input
                      type="text"
                      name="text"
                      placeholder="Mathematics"
                      className="outline-none w-full pr-4"
                    />
                  </div>
                  <Image
                    src="/svgs/lock.svg"
                    width={15}
                    height={15}
                    alt="Lock"
                  />
                </div>
                <button
                  onClick={handleAddInput}
                  className="font-bold text-[12px] w-full hover:bg-green-200 rounded p-4 mt-2"
                >
                  <span className="text-green-700">Go Premium</span> Add Another
                  Subject +
                </button>
                <div className="flex justify-between items-center my-2 p-4 outline-none rounded-[8px] w-full md:w-[40vh] lg:w-[70vh] bg-white">
                  <input
                    type="text"
                    name="text"
                    placeholder="Grade 10, Grade 11 & Grade 12"
                    className="outline-none w-full pr-4"
                  />
                  <Image
                    src="/svgs/polygon.svg"
                    width={15}
                    height={15}
                    alt="Lock"
                  />
                </div>
                <div>
                  <label className="font-bold text-[16px]">Preferences</label>
                  <div className="flex gap-2 w-full">
                    <div className="flex gap-2 justify-between w-[50%] items-center my-2 px-4 py-3 outline-none rounded-[8px] bg-white">
                      <input
                        type="text"
                        name="text"
                        placeholder="HomeWork Support"
                        className="outline-none pr-4"
                      />
                    </div>
                    <div className="flex gap-2 justify-between w-[50%] items-center my-2 px-4 py-3 outline-none rounded-[8px] bg-white">
                      <input
                        type="text"
                        name="text"
                        placeholder="1 on 1 Sessions"
                        className="outline-none pr-4"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex gap-2 justify-between items-center w-[50%] my-2 px-4 py-3 outline-none rounded-[8px] bg-white">
                      <input
                        type="text"
                        name="text"
                        placeholder="Open to Jobs"
                        className="outline-none pr-4"
                      />
                    </div>
                    <div className="flex gap-2 justify-between items-center w-[50%] my-2 px-4 py-3 outline-none rounded-[8px] bg-white">
                      <input
                        type="text"
                        name="text"
                        placeholder="Group Sessions"
                        className="outline-none pr-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={handlePriceView}
                className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3"
              >
                Proceed
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TeacherSubject;
