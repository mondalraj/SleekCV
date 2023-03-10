import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Get prisma to fetch the resumes
      const resumes = await prisma.resume.findMany();
      res.status(200).json({ data: resumes });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
