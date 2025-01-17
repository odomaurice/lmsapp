// here we will generate jwt and send to the users email address
// but first, we will check if the user actually exist across all the user model type
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  // get the email from frontend
  console.log("yes");
  const { email } = await req.json();
  let token;
  let jwtObject: { email?: string; account?: string } = {};
  let baseLink: string = `${process.env.NEXT_PUBLIC_HOMEPAGE!}/handle-reset/`;
  try {
    // lets check if the user is actually a student, if is a student we proceed to generate jwt
    const checkedStudent = await prisma.student.findFirst({
      where: { email },
      select: { name: true },
    });
    if (checkedStudent) {
      jwtObject.email = email;
      jwtObject.account = "student";
      token = jwt.sign(jwtObject, process.env.JWT_SECRETE!, {
        expiresIn: "1hr",
      });
      const link = baseLink + token;
      //   now send mail to the deployed server for mailing
      await fetch(`${process.env.Email_link}message`, {
        method: "POST",
        body: JSON.stringify({ name: checkedStudent.name, link, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return new Response(JSON.stringify({ message: "successful" }), {
        status: 200,
      });
    }
    // lets check if is a teacher account
    const checkedTeacher = await prisma.teacher.findFirst({ where: { email } });
    if (checkedTeacher) {
      console.log("yes");
      jwtObject.email = email;
      jwtObject.account = "teacher";
      token = jwt.sign(jwtObject, process.env.JWT_SECRETE!, {
        expiresIn: "1hr",
      });
      const link = baseLink + token;
      //   now send mail to the deployed server for mailing
      await fetch("https://email-testing-qiuk.onrender.com/message", {
        method: "POST",
        body: JSON.stringify({ name: checkedTeacher.name, link, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return new Response(JSON.stringify({ message: "successful" }), {
        status: 200,
      });
    }
    // check if the account belong to parents
    const checkedParents = await prisma.parents.findFirst({ where: { email } });
    if (checkedParents) {
      jwtObject.email = email;
      jwtObject.account = "parents";
      token = jwt.sign(jwtObject, process.env.JWT_SECRETE!, {
        expiresIn: "1hr",
      });
      const link = baseLink + token;
      //   now send mail to the deployed server for mailing
      await fetch("https://email-testing-qiuk.onrender.com/message", {
        method: "POST",
        body: JSON.stringify({ name: checkedParents.name, link, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return new Response(JSON.stringify({ message: "successful" }), {
        status: 200,
      });
    }

    //   we will return an error message if the user does not exist accross our whole platform
    return new Response(
      JSON.stringify({ message: "Email is not registered" }),
      { status: 404 }
    );
  } catch (error) {
    return serverError();
  }
}
