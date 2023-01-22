import { Header } from "@/components";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSkeleton from "./Profile.skeleton";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [date, setDate] = useState(new Date(user.updated_at));

  if (!isAuthenticated) {
    return navigate("/");
  }

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <Stack
      alignItems="center"
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Header />

      <Container maxWidth="sm">
        {user && (
          <Stack direction="row" spacing={4} sx={{ p: 4, mt: 4, bgcolor: "background.paper", borderRadius: 4 }}>
            <Stack alignItems="center" spacing={2}>
              <Box
                component="img"
                sx={{
                  height: 120,
                  width: 120,
                  border: `8px solid hsla(0, 0%, 0%, 0.1)`,
                  borderRadius: "100%",
                }}
                alt=""
                src={user.picture}
              />
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 300 }}>
                {user.nickname}
              </Typography>
            </Stack>

            <Stack justifyContent="space-between">
              <Typography color="text.secondary">{user.name}</Typography>
              <Typography
                color="text.primary"
                sx={{
                  px: 1,
                  py: 0.5,
                  bgcolor: user.email_verified ? "success.main" : "error.main",
                  borderRadius: 1,
                }}
              >
                {user.email}
              </Typography>

              <Stack alignItems="center" direction="row" spacing={2}>
                <Typography color="text.secondary">Idioma principal de la cuenta:</Typography>

                <Box
                  component="img"
                  sx={{
                    width: 30,
                    height: "fit-content",
                  }}
                  alt={`Image locale ${user.locale}`}
                  src={`https://flagcdn.com/${user.locale}.svg`}
                />
              </Stack>
              <Typography color="text.secondary">
                Actualizado el
                {` ${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()} a las ${date.getMinutes()}:${date.getHours()}.`}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Container>
    </Stack>
  );
};

export default Profile;
