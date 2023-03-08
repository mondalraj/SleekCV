import IProjectsType from "@/types/projectsType";
import {
  ActionIcon,
  Box,
  MultiSelect,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

interface IProps {
  projects: IProjectsType[];
  setProjects: (projects: IProjectsType[]) => void;
}

const ProjectSection = ({ projects, setProjects }: IProps) => {
  const [options, setOptions] = useState([
    { value: "Java", label: "Java" },
    { value: "Python", label: "Python" },
    { value: "C/C++", label: "C/C++" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "Django", label: "Django" },
    { value: "Angular", label: "Angular" },
    { value: "SQL", label: "SQL" },
    { value: "Mongo DB", label: "Mongo DB" },
    { value: "Redis", label: "Redis" },
    { value: "Dynamo DB", label: "Dynamo DB" },
  ]);
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
        <Text>Projects Details</Text>
        <Tooltip label="Add Project" withArrow>
          <ActionIcon
            color="blue"
            size="md"
            radius="xl"
            variant="light"
            disabled={projects.length === 7}
            onClick={() => {
              setProjects([
                ...projects,
                {
                  id: Math.random(),
                  title: "",
                  description: [""],
                  duration: "",
                  link: "",
                  tech_stack: [""],
                },
              ]);
            }}
          >
            <IconPlus size="16" />
          </ActionIcon>
        </Tooltip>
      </Box>
      {projects.map((proj, index) => (
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
            <Text>Project No. {index + 1}</Text>
            {projects.length > 1 && (
              <Tooltip label="Remove Project" withArrow>
                <ActionIcon
                  color="red"
                  size="md"
                  radius="xl"
                  variant="light"
                  onClick={() => {
                    setProjects(projects.filter((item) => item.id !== proj.id));
                  }}
                >
                  <IconMinus size="16" />
                </ActionIcon>
              </Tooltip>
            )}
          </Box>
          <TextInput
            placeholder="Name of Project"
            label="Title of Project"
            variant="filled"
            required
            value={proj.title}
            onChange={(e) => {
              setProjects(
                projects.map((item) => {
                  if (item.id === proj.id) {
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
          <MultiSelect
            label="Technologies Used"
            data={options}
            required
            variant="filled"
            placeholder="Select technologies used in this project (You can even create new ones just by typing)"
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setOptions((current) => [...current, item]);
              return item;
            }}
            value={proj.tech_stack}
            onChange={(value) => {
              setProjects(
                projects.map((item) => {
                  if (item.id === proj.id) {
                    return {
                      ...item,
                      tech_stack: value,
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
              placeholder="Eg. Aug 2019 - Dec 2019"
              label="Project Duration"
              variant="filled"
              required
              value={proj.duration}
              onChange={(e) => {
                setProjects(
                  projects.map((item) => {
                    if (item.id === proj.id) {
                      return {
                        ...item,
                        duration: e.target.value,
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
              placeholder="Live Link or Github Link of your project"
              label="Project Link"
              variant="filled"
              type="url"
              required
              value={proj.link}
              onChange={(e) => {
                setProjects(
                  projects.map((item) => {
                    if (item.id === proj.id) {
                      return {
                        ...item,
                        link: e.target.value,
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
            <Text>Write Description about your project</Text>
            {proj.description.length <= 5 && (
              <Tooltip label="Add Description Line" withArrow>
                <ActionIcon
                  color="gray"
                  size="md"
                  radius="xl"
                  variant="light"
                  onClick={() => {
                    setProjects(
                      projects.map((item) => {
                        if (item.id === proj.id) {
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
          {proj.description.map((desc, index) => (
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
                value={proj.description[index]}
                onChange={(e) => {
                  setProjects(
                    projects.map((item) => {
                      if (item.id === proj.id) {
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
              {proj.description.length > 1 && (
                <Tooltip label="Remove Description Line" withArrow>
                  <ActionIcon
                    color="red"
                    size="sm"
                    radius="xl"
                    variant="light"
                    onClick={() => {
                      setProjects(
                        projects.map((item) => {
                          if (item.id === proj.id) {
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

export default ProjectSection;
