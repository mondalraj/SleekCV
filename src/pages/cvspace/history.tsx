import IEducationDetails from "@/types/educationDetailsType";
import IExperienceDetails from "@/types/experienceDetailsType";
import IProfileDetails from "@/types/profileDetailsType";
import IProjectsType from "@/types/projectsType";
import ISkillsType from "@/types/skillsType";
import {
  ActionIcon,
  Center,
  Container,
  Drawer,
  Group,
  Loader,
  ScrollArea,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import {
  IconCopy,
  IconDownload,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Notify } from "notiflix";
import { useEffect, useState } from "react";
import PDFResume from "../components/PDFResume";
import Layout from "../components/layout/Layout";

const History = () => {
  const [loading, setLoading] = useState(true);
  const [PDFPreviewOpened, setPDFPreviewOpened] = useState(false);
  const [resumes, setResumes] = useState<
    {
      id: string;
      title: string;
      createdAt: string;
      updatedAt: string;
      project: string[];
      experience: string[];
    }[]
  >([]);

  const [selectedResume, setSelectedResume] = useState<{
    title: string;
    profile: IProfileDetails;
    education: IEducationDetails[];
    experience: IExperienceDetails[];
    project: IProjectsType[];
    skill: ISkillsType;
  }>();

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    const getAllResumes = async () => {
      const response = await fetch(`/api/resume/${session?.user?.email}`);
      const data = await response.json();

      setResumes(data.data);
      console.log(data.data);
      setLoading(false);
    };

    getAllResumes();
  }, [session]);

  const handleDeleteResume = async (id: string) => {
    const response = await fetch(`/api/resume/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    if (data.data) {
      Notify.success("Resume deleted successfully.");
      setResumes(resumes.filter((res) => res.id !== id));
    } else {
      Notify.failure("Resume deletion failed.");
    }
  };

  const rows = resumes?.map((res) => (
    <tr key={res.id}>
      <td>
        {new Date(res?.createdAt).toDateString().slice(4)},{" "}
        {new Date(res?.createdAt).toLocaleTimeString().slice(0, -3)}
      </td>
      <td
        style={{
          color: "#0070f3",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {res?.title}
      </td>
      <td>{res?.project?.length}</td>
      <td>{res?.experience?.length}</td>
      <td>
        <Group spacing={"sm"}>
          {/* <Tooltip label="Edit Resume" position="top">
            <ActionIcon size={"sm"} color="blue" variant="outline">
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip> */}
          <Tooltip label="Preview Resume" position="top">
            <ActionIcon
              size={"sm"}
              color="blue"
              variant="outline"
              onClick={() => {
                setSelectedResume(res as any);
                setPDFPreviewOpened(true);
              }}
            >
              <IconEye size={16} />
            </ActionIcon>
          </Tooltip>

          <PDFDownloadLink
            document={
              <PDFResume
                profile={selectedResume?.profile as IProfileDetails}
                education={selectedResume?.education as IEducationDetails[]}
                experience={selectedResume?.experience as IExperienceDetails[]}
                skills={selectedResume?.skill as ISkillsType}
                projects={selectedResume?.project as IProjectsType[]}
              />
            }
            fileName={res?.title || "resume.pdf"}
            style={{
              textDecoration: "none",
              color: "white",
            }}
            onClick={() => {
              setSelectedResume(res as any);
            }}
          >
            {({ blob, url, loading, error }) => (
              <Tooltip label="Download Resume" position="top">
                <ActionIcon size={"sm"} color="blue" variant="outline">
                  <IconDownload size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </PDFDownloadLink>

          <Tooltip label="Duplicate Resume" position="top">
            <ActionIcon
              size={"sm"}
              color="blue"
              variant="outline"
              onClick={() => {
                router.push(`/cvspace/${res.id}`);
              }}
            >
              <IconCopy size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Delete Resume" position="top">
            <ActionIcon
              size={"sm"}
              color="red"
              variant="outline"
              onClick={() => {
                handleDeleteResume(res.id);
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Layout currentPage="History">
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
              profile={selectedResume?.profile as IProfileDetails}
              education={selectedResume?.education as IEducationDetails[]}
              experience={selectedResume?.experience as IExperienceDetails[]}
              skills={selectedResume?.skill as ISkillsType}
              projects={selectedResume?.project as IProjectsType[]}
            />
          </PDFViewer>
        </ScrollArea>
      </Drawer>
      <Container size={"xl"}>
        <Text size={"xl"} mt={20}>
          View all Prafceast Resumes
        </Text>

        <Table highlightOnHover mt={20}>
          <thead>
            <tr>
              <th>Created At</th>
              <th>Resume Title</th>
              <th># Projects</th>
              <th># Experiences</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        {loading && (
          <Center h={"calc(100vh - 300px)"} mt={20}>
            <Loader color="gray" variant="bars" />;
          </Center>
        )}
      </Container>
    </Layout>
  );
};

export default History;
