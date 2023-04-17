import IEducationDetails from "@/types/educationDetailsType";
import IExperienceDetails from "@/types/experienceDetailsType";
import IProfileDetails from "@/types/profileDetailsType";
import IProjectsType from "@/types/projectsType";
import ISkillsType from "@/types/skillsType";
import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

interface IProps {
  profile: IProfileDetails;
  education: IEducationDetails[];
  experience: IExperienceDetails[];
  projects: IProjectsType[];
  skills: ISkillsType;
}

const PDFResume = ({
  profile,
  education,
  experience,
  projects,
  skills,
}: IProps) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              marginBottom: 5,
              fontFamily: "Times Roman Bold",
            }}
          >
            {profile?.name || "No Name"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              fontSize: 11,
              color: "black",
            }}
          >
            <Link
              style={{
                // textDecoration: "none",
                paddingBottom: 1,
                paddingRight: 5,
                borderRight: "1px solid gray",
                color: "black",
                textDecoration: "underline",
              }}
              src={`tel:${profile?.phone}`}
            >
              {profile?.phone || "No Phone"}
            </Link>
            <Link
              style={{
                // textDecoration: "none",
                paddingBottom: 1,
                paddingRight: 5,
                borderRight: "1px solid gray",
                color: "black",
                textDecoration: "underline",
              }}
              src={`mailto:${profile?.email}`}
            >
              {profile?.email || "No Email"}
            </Link>
            <Link
              style={{
                // textDecoration: "none",
                paddingBottom: 1,
                paddingRight: 5,
                borderRight: "1px solid gray",
                color: "black",
                textDecoration: "underline",
              }}
              src={profile?.linkedin}
            >
              {profile?.linkedin.replace("https://www.", "") || "No LinkedIn"}
            </Link>
            <Link
              style={{
                // textDecoration: "none",
                paddingBottom: 1,
                paddingRight: 5,
                color: "black",
                textDecoration: "underline",
              }}
              src={profile?.github}
            >
              {profile?.github.replace("https://", "") || "No Github/Portfolio"}
            </Link>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "light",
              marginTop: 10,
              borderBottom: "0.5px solid gray",
              paddingBottom: 2,
            }}
          >
            EDUCATION
          </Text>
          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            {education?.map((edu, index) => (
              <View
                style={{
                  marginVertical: 5,
                }}
                key={index + 1}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: "Times Roman Bold",
                    }}
                  >
                    {edu?.institution || "No Institution"}
                  </Text>
                  <Text
                    style={{ fontSize: 11, fontFamily: "Times Roman Bold" }}
                  >
                    {edu?.location || "No Location"}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 3,
                    fontSize: 11,
                    fontWeight: "extrabold",
                  }}
                >
                  <Text>{edu?.title || "No Title"}</Text>
                  <Text>{edu?.period || "No Period"}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "light",
              marginTop: 8,
              borderBottom: "0.5px solid gray",
              paddingBottom: 2,
            }}
          >
            EXPERIENCE
          </Text>
          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            {experience?.map((exp, index) => (
              <View
                style={{
                  marginVertical: 5,
                }}
                key={index + 1}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: "Times Roman Bold",
                    }}
                  >
                    {exp?.title || "No Title"}
                  </Text>
                  <Text
                    style={{ fontSize: 11, fontFamily: "Times Roman Bold" }}
                  >
                    {`${exp?.start_date} - ${exp?.end_date}` || "No Duration"}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 3,
                    fontSize: 11,
                  }}
                >
                  <Text>{exp?.company || "No Company"}</Text>
                  <Text>{exp?.location || "No Location"}</Text>
                </View>
                {exp?.description?.map((desc, index) => (
                  <View
                    key={index + 1}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      marginTop: 3,
                      fontSize: 11,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        marginRight: 5,
                      }}
                    >
                      •
                    </Text>
                    <Text
                      style={{
                        textAlign: "justify",
                      }}
                    >
                      {desc || `No Description in line ${index + 1}`}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "light",
              marginTop: 8,
              borderBottom: "0.5px solid gray",
              paddingBottom: 2,
            }}
          >
            PROJECTS
          </Text>
          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            {projects?.map((proj, index) => (
              <View
                style={{
                  marginVertical: 5,
                }}
                key={index + 1}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: "Times Roman Bold",
                      }}
                    >
                      {proj?.title || "No Title"}
                    </Text>

                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: "Times Roman",
                        marginLeft: 5,
                        paddingLeft: 5,
                        borderLeft: "0.5px solid gray",
                      }}
                    >
                      {proj?.tech_stack?.join(", ") || "No Technologies Used"}
                    </Text>
                  </View>
                  <Text
                    style={{ fontSize: 11, fontFamily: "Times Roman Bold" }}
                  >
                    {proj?.duration || "No Duration"}
                  </Text>
                </View>

                {proj?.description?.map((desc, index) => (
                  <View
                    key={index + 1}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      marginTop: 3,
                      fontSize: 11,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        marginRight: 5,
                      }}
                    >
                      •
                    </Text>
                    <Text
                      style={{
                        textAlign: "justify",
                      }}
                    >
                      {desc || `No Description in line ${index + 1}`}
                    </Text>
                  </View>
                ))}

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 10,
                    marginTop: 5,
                  }}
                >
                  {proj?.link && (
                    <Link
                      style={{
                        textDecoration: "none",
                        paddingBottom: 1,
                        paddingRight: 5,
                        borderRight: proj?.githubLink
                          ? "1px solid gray"
                          : "none",
                      }}
                      src={proj?.link}
                    >
                      View Live
                    </Link>
                  )}

                  {proj?.githubLink && (
                    <Link
                      style={{
                        textDecoration: "none",
                        paddingBottom: 1,
                        paddingRight: 5,
                      }}
                      src={proj?.githubLink}
                    >
                      View Code on Github
                    </Link>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "light",
              marginTop: 8,
              borderBottom: "0.5px solid gray",
              paddingBottom: 2,
            }}
          >
            TECHNICAL SKILLS
          </Text>
          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: 5,
                fontSize: 11,
                marginTop: 5,
                marginBottom: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "Times Roman Bold",
                }}
              >
                Languages:
              </Text>
              <Text>{skills?.languages?.join(", ") || "No Languages"}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: 5,
                fontSize: 11,
                marginBottom: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "Times Roman Bold",
                }}
              >
                Frameworks & Libraries:
              </Text>
              <Text>
                {skills?.frameworks_libraries?.join(", ") ||
                  "No Frameworks & Libraries"}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: 5,
                fontSize: 11,
                marginBottom: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "Times Roman Bold",
                }}
              >
                Databases:
              </Text>
              <Text>{skills?.databases?.join(", ") || "No Databases"}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: 5,
                fontSize: 11,
                marginBottom: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "Times Roman Bold",
                }}
              >
                Developer Tools:
              </Text>
              <Text>
                {skills?.developer_tools?.join(", ") || "No Developer Tools"}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Times Roman",
  src: "/times-roman.ttf",
});

Font.register({
  family: "Times Roman Bold",
  src: "/times-roman-bold.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontFamily: "Times Roman",
  },
});

export default PDFResume;
