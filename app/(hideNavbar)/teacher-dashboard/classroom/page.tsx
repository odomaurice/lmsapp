
import React from "react";
import Classroom from "@/components/ui/teacher-dashboard/classroom/classroom";
import AddClassroom from "@/components/ui/teacher-dashboard/addClassroom/addClassroom";

const page = () => {
  return (
    <div className="mt-[80px] md:mt-6">
      <div className="flex justify-end mt-6">
        <AddClassroom/>
      </div>
    <Classroom/>
    </div>
  );
};

export default page;
