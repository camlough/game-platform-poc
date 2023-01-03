// ** React Imports
import { ReactElement } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Icons Imports
import TrendingUp from "mdi-material-ui/TrendingUp";
import TimerSandEmpty from "mdi-material-ui/TimerSandEmpty";
import AlarmCheck from "mdi-material-ui/AlarmCheck";
import GamepadSquare from "mdi-material-ui/GamepadSquare";

// ** Types
type ThemeColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

interface DataType {
  stats: string;
  title: string;
  color: ThemeColor;
  icon: ReactElement;
}

const salesData: DataType[] = [
  {
    stats: "788",
    title: "Games Played",
    color: "primary",
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "4",
    title: "Active Games",
    color: "success",
    icon: <GamepadSquare sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "2",
    color: "warning",
    title: "Waiting Games",
    icon: <TimerSandEmpty sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "568",
    color: "info",
    title: "Hours Played",
    icon: <AlarmCheck sx={{ fontSize: "1.75rem" }} />,
  },
];

const renderStats = () => {
  return salesData.map((item: DataType, index: number) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: "common.white",
            backgroundColor: `${item.color}.main`,
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const StatisticsCard = () => {
  return (
    <Card>
      <CardHeader
        title="Platform Stats"
        subheader={
          <Typography variant="body2" sx={{ mb: 2 }}>
            Some overall stats about Saasy Games 😎
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
