"use client";

import { z } from "zod";
// the schedules array
export const Schedules = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export const Subject = [
  "CHEMISTRY",
  "PHYSICS",
  "BIOLOGY",
  "GOVERNMENT",
  "ENGLISH",
  "LITERATURE",
  "CRS",
  "MATHEMATICS",
  "YORUBA",
  "IGBO",
  "FRENCH",
  "ACCOUNT",
  "GENERAL SCIENCE",
  "PHONICS",
];

export const AllGrade: string[] = [
  "KG",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];
// below is the zod schema for parents that continues with their registration
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// below is the zod schema for adding classroom
//
export const addingClassroomSchema = z.object({
  subject: z.string().min(3, { message: "field is required" }),
  className: z.string().min(3, { message: "field is required" }),
  grade: z.string().min(2, { message: "grade is required" }),
  duration: z.string().min(3, { message: "field is required" }),
  classStarts: z.date(),
  classEnds: z.date(),
  schedules: z.array(z.string(), { message: "please select days of classes" }),
  price: z.string({ message: "enter your price" }),
  classBanner: z
    .any()
    // To not allow empty files
    .refine((files) => files?.length >= 1, { message: "Image is required." })
    // To not allow files other than images
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    })
    // To not allow files larger than 5MB
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
  publicClass: z.boolean().optional(),
  maxCapacity: z.string({ message: "enter your class capacity" }),
  classTime: z.string().min(3, { message: "field is required" }),
});

export const urlRegex =
  /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[a-zA-Z\d_]*)?$/;
