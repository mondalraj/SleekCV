import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

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
  } else if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const prismaUser = await prisma.user.findUnique({
        where: { email: session.user?.email as string },
      });

      if (!prismaUser) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { title } = req.body;

      const resume = await prisma.resume.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });
      res.status(200).json({ data: resume });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
