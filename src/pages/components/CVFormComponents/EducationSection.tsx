import IEducationDetails from "@/types/educationDetailsType";
import { ActionIcon, Box, Text, TextInput, Tooltip } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import "react-phone-number-input/style.css";

interface IProps {
  education: IEducationDetails[];
  setEducation: (education: IEducationDetails[]) => void;
}

const EducationSection = ({ education, setEducation }: IProps) => {
  return (
    <>
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
    </>
  );
};

export default EducationSection;
