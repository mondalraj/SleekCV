import {
  ActionIcon,
  Container,
  Group,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconDownload, IconEdit, IconEye } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";

const History = () => {
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

  const { data: session } = useSession();

  useEffect(() => {
    const getAllResumes = async () => {
      const response = await fetch(`/api/resume/${session?.user?.email}`);
      const data = await response.json();

      setResumes(data.data);
    };

    getAllResumes();
  }, [session]);

  const rows = resumes?.map((res) => (
    <tr key={res.id}>
      <td>
        {new Date(res?.createdAt).toDateString().slice(4)},{" "}
        {new Date(res?.createdAt).toLocaleTimeString().slice(0, -3)}
      </td>
      <td>
        {new Date(res?.updatedAt).toDateString().slice(4)},{" "}
        {new Date(res?.updatedAt).toLocaleTimeString().slice(0, -3)}
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
          <Tooltip label="Edit Resume" position="top">
            <ActionIcon size={"sm"} color="blue" variant="outline">
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Preview Resume" position="top">
            <ActionIcon size={"sm"} color="blue" variant="outline">
              <IconEye size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Download Resume" position="top">
            <ActionIcon size={"sm"} color="blue" variant="outline">
              <IconDownload size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Layout currentPage="History">
      <Container size={"xl"}>
        <Text size={"xl"}>View all past Resumes</Text>
        <Table highlightOnHover mt={20}>
          <thead>
            <tr>
              <th>Created At</th>
              <th>Last Updated</th>
              <th>Resume Title</th>
              <th># Projects</th>
              <th># Experiences</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </Layout>
  );
};

export default History;
