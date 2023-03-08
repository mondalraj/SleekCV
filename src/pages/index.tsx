import {
  ActionIcon,
  Box,
  Button,
  Container,
  Modal,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { PDFViewer } from "@react-pdf/renderer";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PDFResume from "./components/PDFResume";

export default function Home() {
  const [PDFPreviewOpened, setPDFPreviewOpened] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
  });
  const [education, setEducation] = useState([
    {
      id: 1,
      institution: "",
      title: "",
      location: "",
      period: "",
    },
  ]);
  return (
    <>
      <Modal
        opened={PDFPreviewOpened}
        onClose={() => setPDFPreviewOpened(false)}
        title="Previewing your Resume"
        fullScreen
        zIndex={1000}
      >
        <PDFViewer
          style={{
            width: "100%",
            height: "calc(100vh - 150px)",
            borderRadius: "0.5rem",
            border: "none",
          }}
        >
          <PDFResume />
        </PDFViewer>
      </Modal>
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
          <Text
            sx={{
              fontSize: "1.1rem",
              borderBottom: "1px solid #eaeaea",
            }}
          >
            Profile Details
          </Text>
          <TextInput
            placeholder="Your name"
            label="Full name"
            variant="filled"
            required
            onChange={(e) => {
              setProfile({ ...profile, name: e.target.value });
            }}
            value={profile.name}
          />
          <Box
            sx={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              sx={{
                width: "50%",
              }}
              placeholder="Your Email"
              label="Email"
              variant="filled"
              type="email"
              required
              onChange={(e) => {
                setProfile({ ...profile, email: e.target.value });
              }}
              value={profile.email}
            />
            <TextInput
              sx={{
                width: "50%",
              }}
              placeholder="Your Linkedin profile"
              label="Linkedin profile URL"
              type="url"
              variant="filled"
              required
              onChange={(e) => {
                setProfile({ ...profile, linkedin: e.target.value });
              }}
              value={profile.linkedin}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Box
              sx={{
                width: "50%",
              }}
              className="light-phone-input phone-input-container"
            >
              <Text
                component="label"
                htmlFor="phoneInput"
                size="sm"
                weight={500}
                sx={{ display: "block", marginBottom: "0.2rem" }}
                // mt={3}
              >
                Phone Number
                <Text span color="red">
                  {" "}
                  *
                </Text>
              </Text>
              <PhoneInput
                id="phoneInput"
                className="phone-input"
                defaultCountry="IN"
                limitMaxLength={true}
                international
                value={profile.phone}
                onChange={(value) => {
                  setProfile({ ...profile, phone: value as string });
                }}
              />
            </Box>

            <TextInput
              sx={{
                width: "50%",
              }}
              placeholder="Your Github Profile / Portfolio"
              label="Github Profile / Portfolio"
              type="url"
              variant="filled"
              required
              onChange={(e) => {
                setProfile({ ...profile, github: e.target.value });
              }}
              value={profile.github}
            />
          </Box>
          <Box
            sx={{
              fontSize: "1.1rem",
              borderBottom: "1px solid #eaeaea",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem 0",
            }}
          >
            <Text>Education Details</Text>
            <Tooltip label="Add Education Qualification" withArrow>
              <ActionIcon
                color="blue"
                size="md"
                radius="xl"
                variant="light"
                disabled={education.length === 3}
                onClick={() => {
                  setEducation([
                    ...education,
                    {
                      id: education.length + 1,
                      institution: "",
                      title: "",
                      location: "",
                      period: "",
                    },
                  ]);
                }}
              >
                <IconPlus size="16" />
              </ActionIcon>
            </Tooltip>
          </Box>
          {education.map((edu) => (
            <Box
              key={edu.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <Box
                sx={{
                  fontSize: "0.9rem",
                  backgroundColor: "#E1F1FF",
                  padding: "0.5rem 1rem",
                  borderRadius: 5,
                  color: "#0D6EFD",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Qualification No. {edu.id}</Text>
                {education.length > 1 && (
                  <Tooltip label="Remove Education Qualification" withArrow>
                    <ActionIcon
                      color="red"
                      size="md"
                      radius="xl"
                      variant="light"
                      onClick={() => {
                        setEducation(
                          education.filter((item) => item.id !== edu.id)
                        );
                      }}
                    >
                      <IconMinus size="16" />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Box>
              <TextInput
                placeholder="Institution Name"
                label="Institution Name"
                variant="filled"
                required
                value={edu.institution}
                onChange={(e) => {
                  setEducation(
                    education.map((item) => {
                      if (item.id === edu.id) {
                        return {
                          ...item,
                          institution: e.target.value,
                        };
                      }
                      return item;
                    })
                  );
                }}
              />
              <TextInput
                placeholder="Eg. B.Tech in Computer Science and Engineering with CGPA 9.5"
                label="Title of Qualification"
                variant="filled"
                required
              />
              <Box
                sx={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  sx={{
                    width: "50%",
                  }}
                  placeholder="Eg. New Delhi, India"
                  label="Location of Institution"
                  variant="filled"
                  required
                />
                <TextInput
                  sx={{
                    width: "50%",
                  }}
                  placeholder="Eg. Aug 2019 - May 2023"
                  label="Period of Qualification"
                  variant="filled"
                  required
                />
              </Box>
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
            }}
          >
            <Button
              color="blue"
              radius={"xs"}
              variant="outline"
              onClick={() => {
                setPDFPreviewOpened(true);
              }}
            >
              Preview Resume
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}
