import prisma from "@/lib/prisma";
import IEducationDetails from "@/types/educationDetailsType";
import IExperienceDetails from "@/types/experienceDetailsType";
import IProfileDetails from "@/types/profileDetailsType";
import IProjectsType from "@/types/projectsType";
import ISkillsType from "@/types/skillsType";
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

      const {
        profile,
        education,
        experience,
        projects,
        skills,
        title,
      }: {
        profile: IProfileDetails;
        education: Omit<IEducationDetails, "id">[];
        experience: Omit<IExperienceDetails, "id">[];
        projects: Omit<IProjectsType, "id">[];
        skills: ISkillsType;
        title: string;
      } = req.body;

      // console.log(req.body);

      const resume = await prisma.resume.create({
        data: {
          userId: prismaUser.id,
          title,
          profile: {
            create: profile,
          },
          education: {
            createMany: {
              data: education,
            },
          },
          experience: {
            createMany: {
              data: experience,
            },
          },
          project: {
            createMany: {
              data: projects,
            },
          },
          skill: {
            create: skills,
          },
        },
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
