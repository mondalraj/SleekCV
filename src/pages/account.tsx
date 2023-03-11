import { GetServerSideProps } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

const Account = () => {
  const { data: session, status } = useSession({ required: true });
  console.log(session);
  if (session && session.user) {
    return (
      <>
        <p>Welcome, {session.user.name}</p>
        You are accessing Account page <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      You need to signIn first.
      <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Account;
