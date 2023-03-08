import ISkillsType from "@/types/skillsType";
import { Box, MultiSelect, Text } from "@mantine/core";
import { useState } from "react";

interface IProps {
  skills: ISkillsType;
  setSkills: (skills: ISkillsType) => void;
}

const TechnicalSkillsSection = ({ skills, setSkills }: IProps) => {
  const [languageOptions, setLanguageOptions] = useState([
    { value: "Java", label: "Java" },
    { value: "Python", label: "Python" },
    { value: "C/C++", label: "C/C++" },
    { value: "JavaScript", label: "JavaScript" },
  ]);

  const [frameworkOptions, setFrameworkOptions] = useState([
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "Django", label: "Django" },
    { value: "Angular", label: "Angular" },
  ]);

  const [databaseOptions, setDatabaseOptions] = useState([
    { value: "SQL", label: "SQL" },
    { value: "Mongo DB", label: "Mongo DB" },
    { value: "Redis", label: "Redis" },
    { value: "Dynamo DB", label: "Dynamo DB" },
  ]);

  const [toolOptions, setToolOptions] = useState([
    { value: "Git & Github", label: "Git & Github" },
    { value: "Docker", label: "Docker" },
    { value: "Google Cloud Platform", label: "Google Cloud Platform" },
    { value: "Amazon Web Services", label: "Amazon Web Services" },
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
        <Text>Technical Skills</Text>
      </Box>
      <MultiSelect
        label="Languages"
        data={languageOptions}
        required
        variant="filled"
        placeholder="Select languages you know (You can even create new ones just by typing)"
        searchable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => {
          const item = { value: query, label: query };
          setLanguageOptions((current) => [...current, item]);
          return item;
        }}
        value={skills?.languages}
        onChange={(value) => {
          setSkills({
            ...skills,
            languages: value,
          });
        }}
      />

      <MultiSelect
        label="Frameworks & Libraries"
        data={frameworkOptions}
        required
        variant="filled"
        placeholder="Select Frameworks & Libraries you know (You can even create new ones just by typing)"
        searchable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => {
          const item = { value: query, label: query };
          setFrameworkOptions((current) => [...current, item]);
          return item;
        }}
        value={skills?.frameworks_libraries}
        onChange={(value) => {
          setSkills({
            ...skills,
            frameworks_libraries: value,
          });
        }}
      />

      <MultiSelect
        label="Databases"
        data={databaseOptions}
        required
        variant="filled"
        placeholder="Select Databases you know (You can even create new ones just by typing)"
        searchable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => {
          const item = { value: query, label: query };
          setDatabaseOptions((current) => [...current, item]);
          return item;
        }}
        value={skills?.databases}
        onChange={(value) => {
          setSkills({
            ...skills,
            databases: value,
          });
        }}
      />

      <MultiSelect
        label="Developer Tools"
        data={toolOptions}
        required
        variant="filled"
        placeholder="Select Developer Tools you know (You can even create new ones just by typing)"
        searchable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => {
          const item = { value: query, label: query };
          setToolOptions((current) => [...current, item]);
          return item;
        }}
        value={skills?.developer_tools}
        onChange={(value) => {
          setSkills({
            ...skills,
            developer_tools: value,
          });
        }}
      />
    </>
  );
};

export default TechnicalSkillsSection;
