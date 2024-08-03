// here, we handle creation of one to one section
// teachers can create one on one sections via the oneononesection model
// then students can apply to this one on on section via the appliedSection
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// here we first make a post request
// there for creating the new one to one section
export async function POST(req: Request) {
  const teacherId = await serverSessionId();
  const role = await serverSessionRole();
  const payload = await req.json();
  console.log(payload);
  if (!teacherId) return notAuthenticated();
  if (role !== "Teacher")
    return new Response(
      JSON.stringify({
        message: "oops, only teachers can perform this action",
      }),
      { status: 401 }
    );
  // now, lets proceed and create the section
  try {
    await prisma.oneOnOneSection.create({
      data: { teacherId: teacherId, ...payload },
    });
    return new Response(
      JSON.stringify({ message: "section created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// here, we get our section
// while getting our section, we also include the applied sections
export async function GET(req: Request) {
  const teacherId = await serverSessionId();

  try {
    const allSections = await prisma.oneOnOneSection.findUnique({
      where: {
        teacherId,
      },
      include: {
        AppliedSection: true,
      },
    });
    return new Response(JSON.stringify(allSections), { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// here, we provide the route for updating the section
export async function PUT(req: Request) {
  const teacherId = await serverSessionId();
  const payload = await req.json();
  if (!teacherId) {
    return new Response(JSON.stringify({ message: "you are not logged in" }));
  }
  // lets get the oneononesection and update it
  try {
    await prisma.oneOnOneSection.update({
      where: { teacherId },
      data: { ...payload },
    });
    return new Response(JSON.stringify({ message: "updated successfully" }), {
      status: 200,
    });
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}
