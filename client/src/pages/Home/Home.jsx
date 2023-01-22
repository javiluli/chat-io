import { ChatSection } from "@/components";
import { setLocalStorage } from "@/utilities/localstorage.utility";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Container, Stack } from "@mui/material";
import { useEffect } from "react";
import { Header } from "@/components";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (user) {
      setLocalStorage("authenticatedUser", user);
    }
  }, [isAuthenticated]);

  return (
    <Stack
      alignItems="center"
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Header />

      <Container
        maxWidth="sm"
        sx={{
          maxHeight: "calc(100vh - 10em)",
          height: "100vh",
        }}
      >
        <ChatSection />
      </Container>
    </Stack>
  );
};

export default Home;
