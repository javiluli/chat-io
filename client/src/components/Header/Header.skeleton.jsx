import { AppBar, Toolbar } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const HeaderSkeleton = () => {
  return (
    <AppBar position="sticky" elevation={0} sx={{ width: "100%" }}>
      <Toolbar disableGutters sx={{ width: "100%", px: 4 }}>
        <Stack direction="row" justifyContent="space-between" spacing={4} sx={{ width: "100%", px: 4 }}>
          <Skeleton variant="text" sx={{ width: "100%", fontSize: "1rem" }} />
          <Skeleton variant="circular" width={40} height={40} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderSkeleton;
