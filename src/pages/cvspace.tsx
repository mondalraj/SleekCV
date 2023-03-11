import IEducationDetails from "@/types/educationDetailsType";
import IExperienceDetails from "@/types/experienceDetailsType";
import IProfileDetails from "@/types/profileDetailsType";
import IProjectsType from "@/types/projectsType";
import ISkillsType from "@/types/skillsType";
import {
  Box,
  Button,
  Container,
  Drawer,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import EducationSection from "./components/CVFormComponents/EducationSection";
import ExperienceSection from "./components/CVFormComponents/ExperienceSection";
import ProfileSection from "./components/CVFormComponents/ProfileSection";
import ProjectSection from "./components/CVFormComponents/ProjectSection";
import TechnicalSkillsSection from "./components/CVFormComponents/TechnicalSkillsSection";
import PDFResume from "./components/PDFResume";

export default function CVSpace() {
  const { data: session } = useSession({ required: true });
  const [PDFPreviewOpened, setPDFPreviewOpened] = useState(false);
  const [filename, setFilename] = useState("");
  const [profile, setProfile] = useState<IProfileDetails>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
  });

  const [education, setEducation] = useState<IEducationDetails[]>([
    {
      id: 1,
      institution: "",
      title: "",
      location: "",
      period: "",
    },
  ]);

  const [experience, setExperience] = useState<IExperienceDetails[]>([
    {
      id: 1,
      title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      description: [""],
    },
  ]);

  const [projects, setProjects] = useState<IProjectsType[]>([
    {
      id: 1,
      title: "",
      description: [""],
      duration: "",
      link: "",
      tech_stack: [""],
    },
  ]);

  const [skills, setSkills] = useState<ISkillsType>({
    languages: [""],
    frameworks_libraries: [""],
    databases: [""],
    developer_tools: [""],
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCreateResume = async () => {
    try {
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: profile.name,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Drawer
        opened={PDFPreviewOpened}
        onClose={() => {
          setPDFPreviewOpened(false);
        }}
        title="Previewing your Resume"
        padding="xl"
        size="100%"
        position="right"
        style={{
          zIndex: 1000,
          overflow: "hidden",
        }}
      >
        <ScrollArea sx={{ height: `calc(100vh - 110px)` }} type="never">
          <PDFViewer
            style={{
              width: "100%",
              height: "calc(100vh - 110px)",
              borderRadius: "0.5rem",
              border: "none",
            }}
          >
            <PDFResume
              profile={profile}
              education={education}
              experience={experience}
              skills={skills}
              projects={projects}
            />
          </PDFViewer>
        </ScrollArea>
      </Drawer>
      <Container>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginTop: 20,
            marginBottom: 20,
          }}
          autoComplete="off"
        >
          <ProfileSection profile={profile} setProfile={setProfile} />

          <EducationSection education={education} setEducation={setEducation} />

          <ExperienceSection
            experience={experience}
            setExperience={setExperience}
          />

          <ProjectSection projects={projects} setProjects={setProjects} />

          <TechnicalSkillsSection skills={skills} setSkills={setSkills} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              paddingTop: "1rem",
              marginTop: "2rem",
              borderTop: "1px solid #eaeaea",
            }}
          >
            <TextInput
              sx={{
                width: "100%",
              }}
              placeholder="Filename for downloading (Eg. resume.pdf)"
              variant="filled"
              value={filename}
              onChange={(e) => {
                setFilename(e.target.value);
              }}
            />
            <Button
              color="blue"
              radius={"xs"}
              variant="outline"
              onClick={() => {
                console.log("profile", profile);
                console.log("education", education);
                setPDFPreviewOpened(true);
              }}
            >
              Preview Resume
            </Button>
            {isClient && (
              <Button color="green" radius={"xs"} variant="filled">
                <PDFDownloadLink
                  document={
                    <PDFResume
                      profile={profile}
                      education={education}
                      experience={experience}
                      skills={skills}
                      projects={projects}
                    />
                  }
                  fileName={filename || "resume.pdf"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading document..." : "Download Resume"
                  }
                </PDFDownloadLink>
              </Button>
            )}
            {/* <Button
              color="blue"
              radius={"xs"}
              variant="outline"
              onClick={() => {
                handleCreateResume();
              }}
            >
              Add
            </Button> */}
          </Box>
        </form>
      </Container>
    </>
  );
}
