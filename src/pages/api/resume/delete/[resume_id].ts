import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { resume_id } = req.query;

  if (req.method === "DELETE") {
    try {
      // Get prisma to delete the resume
      const resume = await prisma.resume.delete({
        where: { id: resume_id as string },
      });
      res.status(200).json({ data: resume });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
