import { Box, Button, Text } from "@mantine/core";
// import { GithubIcon } from "@mantine/ds";
import {
  IconArrowBigRightLine,
  IconBrandGithubFilled,
} from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "./components/layout/Navbar";

const Home = () =>
  // { data }: { data: Prisma.ResumeGetPayload<{}>[] }
  {
    //   console.log(data);
    const { data: session } = useSession();

    return (
      <Box>
        <Navbar />
        <Box
          sx={{
            height: "calc(100vh - 70px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "40%",
              height: "100%",
              backgroundColor: "black",
              backgroundImage: "url('/hero-image.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <Box
            sx={{
              width: "60%",
              padding: "2rem",
              height: "100%",
              display: "flex",

              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              sx={{
                fontSize: "2.2rem",
                fontWeight: "bold",
                color: "black",
                textAlign: "left",
                textTransform: "uppercase",
              }}
            >
              Craft your career story with Sleek CV <br />{" "}
              <Text size={24} fw={400} transform="capitalize">
                where clean meets professional.
              </Text>
            </Text>

            <Text
              size={"md"}
              sx={{
                lineHeight: "1.2",
                maxWidth: "650px",
                margin: "2rem 0",
                marginTop: "3rem",
              }}
              transform="capitalize"
            >
              Sleek CV is a user-friendly app that allows you to create multiple
              resumes, edit them, download them, and preview them in real-time.
              You can access all your previous built resumes with ease. With
              Sleek CV, you can create a professional-looking resume that will
              impress potential employers. <br /> Sign up today!
            </Text>
            {session && session.user ? (
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <Button
                  leftIcon={<IconArrowBigRightLine size="1rem" />}
                  size="md"
                  color="dark"
                  variant="filled"
                >
                  <Link
                    href="/cvspace"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Go to CV Space
                  </Link>
                </Button>
                <Button
                  size="md"
                  onClick={() => signOut()}
                  sx={(theme) => ({
                    border: `1px solid ${
                      theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6]
                    }`,
                    backgroundColor: "transparent",
                    color: "black",
                  })}
                  color="dark"
                  variant="outline"
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <Button
                  leftIcon={<IconBrandGithubFilled size="1rem" />}
                  size="md"
                  color="dark"
                  variant="filled"
                  onClick={() => {
                    signIn("github");
                  }}
                >
                  Get Started With Github
                </Button>
                <Button
                  size="md"
                  sx={(theme) => ({
                    border: `1px solid ${
                      theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6]
                    }`,
                    backgroundColor: "transparent",
                    color: "black",
                  })}
                  color="dark"
                  variant="outline"
                >
                  <Link
                    href="/explore"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    Explore as Guest
                  </Link>
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        {/* <p>Welcome, {session.user.name}</p>
      Signed in as {session.user.email} <br /> */}
      </Box>
    );
  };

export default Home;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const resumes = await prisma.resume.findMany();

//   const serializedResumes = resumes.map((resume) => {
//     return {
//       ...resume,
//       createdAt: resume.createdAt.toISOString(),
//       updatedAt: resume.updatedAt.toISOString(),
//     };
//   });

//   return {
//     props: { data: serializedResumes },
//   };
// };
