// ** MUI Imports
import Grid from "@mui/material/Grid";

import { useUser } from "@supabase/auth-helpers-react";

import Trophy from "../components/dashboard/Trophy";
import OverviewStats from "../components/dashboard/OverviewStats";
import ActiveGames from "../components/dashboard/ActiveGames";
import WaitingRoom from "../components/dashboard/WaitingRoom";
import PersonalStats from "../components/dashboard/PersonalStats";

import { useProfile, Profile } from "../utils/hooks/useProfile";

const renderUnauthenticatedView = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <OverviewStats />
      </Grid>
      <Grid item xs={12} md={12}>
        <ActiveGames />
      </Grid>
    </Grid>
  );
};

const renderAuthenticatedView = (profile: Profile | null) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <Trophy profile={profile} />
      </Grid>
      <Grid item xs={12} md={8}>
        <PersonalStats profile={profile} />
      </Grid>
      <Grid item xs={12} md={12}>
        <OverviewStats />
      </Grid>
      <Grid item xs={12} md={12}>
        <WaitingRoom />
      </Grid>
      <Grid item xs={12} md={12}>
        <ActiveGames />
      </Grid>
    </Grid>
  );
};

export default function Home() {
  const user = useUser();
  const { profile } = useProfile();
  if (user) {
    return renderAuthenticatedView(profile);
  } else {
    return renderUnauthenticatedView();
  }
}
