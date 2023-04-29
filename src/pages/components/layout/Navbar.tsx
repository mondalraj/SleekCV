import { ActionIcon, Box, Button, Image, Tooltip } from "@mantine/core";
import { IconBrandGithub, IconBrandGithubFilled } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <Box
      sx={{
        width: "100%",
        height: "70px",
        // backgroundColor: "#171717",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          fontSize: "1.3rem",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          SleeK CV
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {session && session.user ? (
          <>
            <Image
              alt="Profile Image"
              src={
                session && session.user
                  ? session.user.image
                  : "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              }
              width={30}
              height={30}
              radius={"xl"}
            />
            {session && session.user ? session.user.name : "Guest User"}
          </>
        ) : (
          <Button
            leftIcon={<IconBrandGithubFilled size="1rem" />}
            size="sm"
            color="dark"
            variant="default"
            onClick={() => {
              signIn("github").then((res) => {
                window.location.href = "/cvspace";
              });
            }}
          >
            Sign In With Github
          </Button>
        )}
        <Tooltip label="Contribute on Github">
          <ActionIcon
            radius="xl"
            variant="outline"
            size="lg"
            component="a"
            href="https://github.com/mondalraj/SleekCV"
          >
            <IconBrandGithub color="#fff" />
          </ActionIcon>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Navbar;
