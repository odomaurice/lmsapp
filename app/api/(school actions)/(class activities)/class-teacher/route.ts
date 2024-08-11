// in this route we perform the activities of adding teachers to the class
// deleting teacher from the class
// getting information of a teacher in our class
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function POST(req: Request) {
  // TODO: change the schoolID in the body below to the nextauth id
  const { schoolClassId, teacherIds } = await req.json();
  const schoolId = await serverSessionId();
  // first, lets check if the school that want to add the teacher to the class is actually
  //   the owners of the class created
  const getClass = await prisma.schoolClass.findUnique({
    where: {
      id: schoolClassId,
    },
    select: {
      schoolId: true,
    },
  });
  // returning an error if the class does not exist maybe a mistake from the frontend
  if (!getClass) {
    return new Response(JSON.stringify({ message: "class does not exist" }), {
      status: 404,
    });
  }
  // checking if the school is actually the one that created the class
  if (getClass?.schoolId !== schoolId) {
    return new Response(
      JSON.stringify({
        message: "you can't add a teacher to the class you did not create",
      }),
      { status: 400 }
    );
  }
  //   now we can go on and add the teacher to the class
  try {
    for (const teacher of teacherIds) {
      console.log(teacher);
      await prisma.schoolClassTeacher.upsert({
        where: { id: teacher },
        create: {
          teacherId: teacher as string,
          schoolClassId,
        },
        update: {
          teacherId: teacher,
        },
      });
    }
    return new Response(
      JSON.stringify({ message: "teacher added to the class successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
}

// this function below will act as a delete functionality for teachers that are already in the class
export async function DELETE(req: Request) {
  const { schoolClassId, teacherId } = await req.json();
  const schoolId = await serverSessionId();
  //// first, lets check if the school that want to add the teacher to the class is actually
  //   the owners of the class created
  const getClass = await prisma.schoolClass.findUnique({
    where: {
      id: schoolClassId,
    },
    select: {
      schoolId: true,
    },
  });
  if (getClass?.schoolId !== schoolId) {
    return new Response(
      JSON.stringify({
        message: "you can't add a teacher to the class you did not create",
      }),
      { status: 400 }
    );
  }
  //   logic to check if the teacher is actually existing
  // if teacher is not existing return an error message
  const checkTeacherInClass = await prisma.schoolClassTeacher.findFirst({
    where: {
      teacherId,
      schoolClassId,
    },
    select: {
      id: true,
    },
  });
  if (!checkTeacherInClass) {
    return new Response(
      JSON.stringify({ message: "This teacher does not exist in this class" }),
      { status: 404 }
    );
  }

  //   now we can proceed to delete
  try {
    await prisma.schoolClassTeacher.delete({
      where: {
        id: checkTeacherInClass.id,
      },
    });
    return new Response(
      JSON.stringify({ message: "teacher deleted successfully from class" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
}

// here, we are getting all the teachers that belongs to the school
// because we want to add them, and we can only add teachers with a status of active
// so, this route specifically get teachers with status of active so we can add them to a class
export async function GET(req: Request) {
  const schoolId = await serverSessionId();
  if (!schoolId) return notAuthenticated();
  // we can now proceed to get all the teachers under that school, which their status is not active
  try {
    const allTeachers = await prisma.schoolTeacher.findMany({
      where: {
        schoolId: schoolId,
        status: "ACTIVE",
      },
      select: {
        teacher: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(allTeachers), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
