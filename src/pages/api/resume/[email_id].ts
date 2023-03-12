import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email_id } = req.query;

  if (req.method === "GET") {
    try {
      // Get prisma to fetch the resumes of the user
      const user = await prisma.user.findUnique({
        where: { email: email_id as string },
        include: {
          resumes: {
            include: {
              profile: true,
              education: true,
              experience: true,
              project: true,
              skill: true,
            },
          },
        },
      });
      res.status(200).json({ data: user?.resumes });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
