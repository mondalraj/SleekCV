import {
  ActionIcon,
  Box,
  Button,
  Container,
  Drawer,
  ScrollArea,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PDFResume from "./components/PDFResume";

export default function Home() {
  const [PDFPreviewOpened, setPDFPreviewOpened] = useState(false);
  const [filename, setFilename] = useState("");
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
            <PDFResume profile={profile} education={education} />
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
          {education.map((edu, index) => (
            <Box
              key={index + 1}
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
                <Text>Qualification No. {index + 1}</Text>
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
                value={edu.title}
                onChange={(e) => {
                  setEducation(
                    education.map((item) => {
                      if (item.id === edu.id) {
                        return {
                          ...item,
                          title: e.target.value,
                        };
                      }
                      return item;
                    })
                  );
                }}
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
                  value={edu.location}
                  onChange={(e) => {
                    setEducation(
                      education.map((item) => {
                        if (item.id === edu.id) {
                          return {
                            ...item,
                            location: e.target.value,
                          };
                        }
                        return item;
                      })
                    );
                  }}
                />
                <TextInput
                  sx={{
                    width: "50%",
                  }}
                  placeholder="Eg. Aug 2019 - May 2023"
                  label="Period of Qualification"
                  variant="filled"
                  required
                  value={edu.period}
                  onChange={(e) => {
                    setEducation(
                      education.map((item) => {
                        if (item.id === edu.id) {
                          return {
                            ...item,
                            period: e.target.value,
                          };
                        }
                        return item;
                      })
                    );
                  }}
                />
              </Box>
            </Box>
          ))}
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
            <Button color="green" radius={"xs"} variant="filled">
              <PDFDownloadLink
                document={<PDFResume profile={profile} education={education} />}
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
          </Box>
        </form>
      </Container>
    </>
  );
}
