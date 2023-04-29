import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { resume_id } = req.query;

  if (req.method === "GET") {
    try {
      // Get prisma to fetch the resumes of the user
      const resume = await prisma.resume.findUnique({
        where: { id: resume_id as string },

        include: {
          profile: true,
          education: true,
          experience: true,
          project: true,
          skill: true,
        },
      });
      res.status(200).json({ data: resume });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
