import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";

const ProfileSkeleton = () => {
  return (
    <Container maxWidth="sm">
      <Stack direction="row" spacing={4} sx={{ p: 4, mt: 4 }}>
        <Stack alignItems="center" spacing={2}>
          <Skeleton variant="circular" width={120} height={120} />
          <Skeleton variant="text" sx={{ width: "100%", fontSize: "1.25rem" }} />
        </Stack>

        <Stack justifyContent="space-between" sx={{ width: "100%" }}>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default ProfileSkeleton;
