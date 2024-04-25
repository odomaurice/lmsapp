import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ParentalControl = () => {
  return (
    <main className="mx-auto max-w-4xl">
      <section
        id="hero font-header"
        className="widescreen:section-min-height tallscreen:section-min-height  flex scroll-mt-40 flex-col-reverse mb-20 items-center justify-evenly gap-6 p-6 sm:flex-row"
      >
        <article className="sm:w-1/2">
          <p className="mt-6 font-header text-lg font-semibold text-dimYellow">
            Parental Control
          </p>

          <p className="mt-4 max-w-full text-justify text-lg font-subtext font-[300px] sm:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            interdum sapien, id aliquam ligula. Maecenas eget neque id ligula
            egestas blandit. Suspendisse potenti. Phasellus efficitur nulla at
            justo aliquam placerat. In ullamcorper malesuada iaculis. Nullam
            consectetur in leo sit amet ornare.
          </p>

          <Button
            asChild
            className=" bg-lightGreen rounded-xl text-white text-base mt-3 px-3 w-32  py-2 text-center lg:block"
          >
            <Link href="/register">Get Started!</Link>
          </Button>
        </article>
        <div className="w-full sm:w-1/3 lgl:w-1/3 h-80 relative group">
          <div className="absolute overflow-hidden w-full h-80 left-1 -top-3 rounded-2xl ">
            <div className="w-full  h-full relative z-20 flex pl-6 lgl:pl-0">
              <Image
                className="rounded-lg  mx-auto h-full w-full object-cover"
                src={"/img-4.jpg"}
                alt="profileImg"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className=" lgl:inline-flex w-full h-80 border-2 border-lightGreen rounded-md"></div>
        </div>
      </section>
    </main>
  );
};

export default ParentalControl;