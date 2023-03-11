import {
  AppShell,
  Box,
  Burger,
  Container,
  Header,
  Image,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { ReactNode, useState } from "react";

import { createStyles, getStylesRef } from "@mantine/core";
import { IconFilePlus, IconHistory, IconLogout } from "@tabler/icons-react";
import { useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.md,
    color: theme.colors.dark[1],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "dark",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "dark", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "dark", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const data = [
  { link: "/cvspace", label: "Build New", icon: IconFilePlus },
  { link: "/cvspace/history", label: "History", icon: IconHistory },
  //   { link: "", label: "Explore", icon: IconFingerprint },
];

const Layout = ({
  children,
  currentPage,
}: {
  children: ReactNode;
  currentPage?: string;
}) => {
  const { data: session } = useSession({ required: true });
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState("Build New");
  const { classes, cx } = useStyles();

  const links = data.map((item) => (
    <Link
      href={item.link}
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          sx={{
            color: "white",
            background: theme.colors.dark[8],
          }}
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Navbar.Section grow>{links}</Navbar.Section>

          <Navbar.Section>
            <a
              href="#"
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
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
              </Box>
            </a>

            <a
              href="#"
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header
          sx={{
            background: theme.colors.dark[8],
            color: "white",
            borderBottom: `1px solid ${theme.colors.dark[7]}`,
          }}
          height={{ base: 40, md: 50 }}
          p="md"
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

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
          </div>
        </Header>
      }
    >
      <Container>{children}</Container>
    </AppShell>
  );
};

export default Layout;
