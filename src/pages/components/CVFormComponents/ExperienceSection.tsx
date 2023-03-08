import IExperienceDetails from "@/types/experienceDetailsType";
import { ActionIcon, Box, Text, TextInput, Tooltip } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface IProps {
  experience: IExperienceDetails[];
  setExperience: (experience: IExperienceDetails[]) => void;
}

const ExperienceSection = ({ experience, setExperience }: IProps) => {
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
        <Text>Experience Details</Text>
        <Tooltip label="Add Experience" withArrow>
          <ActionIcon
            color="blue"
            size="md"
            radius="xl"
            variant="light"
            disabled={experience?.length === 7}
            onClick={() => {
              setExperience([
                ...experience,
                {
                  id: Math.random(),
                  company: "",
                  title: "",
                  location: "",
                  description: [""],
                  start_date: "",
                  end_date: "",
                },
              ]);
            }}
          >
            <IconPlus size="16" />
          </ActionIcon>
        </Tooltip>
      </Box>
      {experience?.map((exp, index) => (
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
            <Text>Experience No. {index + 1}</Text>
            {experience?.length > 1 && (
              <Tooltip label="Remove Experience" withArrow>
                <ActionIcon
                  color="red"
                  size="md"
                  radius="xl"
                  variant="light"
                  onClick={() => {
                    setExperience(
                      experience?.filter((item) => item.id !== exp.id)
                    );
                  }}
                >
                  <IconMinus size="16" />
                </ActionIcon>
              </Tooltip>
            )}
          </Box>
          <TextInput
            placeholder="Eg. software engineer"
            label="Title of Qualification"
            variant="filled"
            required
            value={exp?.title}
            onChange={(e) => {
              setExperience(
                experience?.map((item) => {
                  if (item.id === exp.id) {
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
              placeholder="Eg. Microsoft"
              label="Company Name"
              variant="filled"
              required
              value={exp?.company}
              onChange={(e) => {
                setExperience(
                  experience?.map((item) => {
                    if (item.id === exp.id) {
                      return {
                        ...item,
                        company: e.target.value,
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
              placeholder="Eg. Gurgaon, India"
              label="Working Location"
              variant="filled"
              required
              value={exp?.location}
              onChange={(e) => {
                setExperience(
                  experience?.map((item) => {
                    if (item.id === exp.id) {
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
          </Box>
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
              placeholder="Eg. Aug 2019"
              label="Start Date"
              variant="filled"
              required
              value={exp?.start_date}
              onChange={(e) => {
                setExperience(
                  experience?.map((item) => {
                    if (item.id === exp.id) {
                      return {
                        ...item,
                        start_date: e.target.value,
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
              placeholder="Eg. Aug 2022 or Present(if still working)"
              label="End Date"
              variant="filled"
              required
              value={exp?.end_date}
              onChange={(e) => {
                setExperience(
                  experience?.map((item) => {
                    if (item.id === exp.id) {
                      return {
                        ...item,
                        end_date: e.target.value,
                      };
                    }
                    return item;
                  })
                );
              }}
            />
          </Box>
          <Box
            sx={{
              fontSize: "0.8rem",
              backgroundColor: "#f7f7f7",
              padding: "0.5rem 1rem",
              borderRadius: 5,
              color: "gray",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>Write Description about your work experience</Text>
            {exp?.description?.length <= 5 && (
              <Tooltip label="Add Description Line" withArrow>
                <ActionIcon
                  color="gray"
                  size="md"
                  radius="xl"
                  variant="light"
                  onClick={() => {
                    setExperience(
                      experience?.map((item) => {
                        if (item.id === exp.id) {
                          return {
                            ...item,
                            description: [...item.description, ""],
                          };
                        }
                        return item;
                      })
                    );
                  }}
                >
                  <IconPlus size="16" />
                </ActionIcon>
              </Tooltip>
            )}
          </Box>
          {exp?.description?.map((desc, index) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
              key={index + 1}
            >
              <TextInput
                sx={{
                  width: "100%",
                }}
                placeholder={`Description Line ${
                  index + 1
                } (Eg. Worked on a project to build a website for a client)`}
                variant="filled"
                required
                value={exp?.description[index]}
                onChange={(e) => {
                  setExperience(
                    experience?.map((item) => {
                      if (item.id === exp.id) {
                        return {
                          ...item,
                          description: item.description.map((des, i) => {
                            if (i === index) {
                              return e.target.value;
                            }
                            return des;
                          }),
                        };
                      }
                      return item;
                    })
                  );
                }}
              />
              {exp?.description?.length > 1 && (
                <Tooltip label="Remove Description Line" withArrow>
                  <ActionIcon
                    color="red"
                    size="sm"
                    radius="xl"
                    variant="light"
                    onClick={() => {
                      setExperience(
                        experience?.map((item) => {
                          if (item.id === exp.id) {
                            return {
                              ...item,
                              description: item.description.filter(
                                (des, i) => i !== index
                              ),
                            };
                          }
                          return item;
                        })
                      );
                    }}
                  >
                    <IconMinus size="12" />
                  </ActionIcon>
                </Tooltip>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
};

export default ExperienceSection;
