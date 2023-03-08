import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

interface IProps {
  profile: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  education: {
    id: number;
    institution: string;
    title: string;
    location: string;
    period: string;
  }[];
}

const PDFResume = ({ profile, education }: IProps) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              marginBottom: 5,
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
              fontSize: 9,
              color: "black",
            }}
          >
            <Link
              style={{
                color: "black",
                textDecoration: "none",
                paddingBottom: 1,
                paddingRight: 5,
                borderRight: "1px solid gray",
              }}
              src={`tel:${profile?.phone}`}
            >
              {profile?.phone || "No Phone"}
            </Link>
            <Link
              style={{
                color: "black",
                textDecoration: "none",
                paddingBottom: 1,
                paddingRight: 5,
                borderRight: "1px solid gray",
              }}
              src={`mailto:${profile?.email}`}
            >
              {profile?.email || "No Email"}
            </Link>
            <Link
              style={{
                color: "black",
                textDecoration: "none",
                paddingBottom: 1,
                paddingRight: 5,
                borderRight: "1px solid gray",
              }}
              src={profile?.linkedin}
            >
              {profile?.linkedin.replace("https://www.", "") || "No LinkedIn"}
            </Link>
            <Link
              style={{
                color: "black",
                textDecoration: "none",
                paddingBottom: 1,
                paddingRight: 5,
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
              borderBottom: "1px solid gray",
              paddingBottom: 2,
            }}
          >
            EDUCATION
          </Text>
          <View
            style={{
              paddingHorizontal: 5,
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
                  <Text style={{ fontSize: 10, fontWeight: 700 }}>
                    {edu?.institution || "No Institution"}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: 400 }}>
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
                    fontSize: 9,
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
      </Page>
    </Document>
  );
};

// Font.register({
//   family: "Courier",
//   //   src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
//   src: "https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Poppins:wght@200;300;400;600;700&display=swap",
// });

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    // fontFamily: "Courier",
  },
});

export default PDFResume;
