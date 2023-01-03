import Grid from "@mui/material/Grid";
import TicTacToe from "../../../components/games/TicTacToe";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";
import { useRouter } from "next/router";

const TicTacToeGame = ({ gameId }: { gameId: string }) => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const setGameResults = async (result: string) => {
    try {
      const gameResultsUpdates = {
        id: gameId,
        user_id: user?.id,
        outcome: result,
        completed_at: new Date(),
        opponent_username: "BotOne",
      };

      // update game record
      const { error: gameResultError } = await supabase
        .from("game_results")
        .upsert(gameResultsUpdates);
      if (gameResultError) {
        throw gameResultError;
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{ mt: 10 }}
    >
      <Grid item>
        <TicTacToe
          setGameResults={setGameResults}
          playAgain={() => router.push(window.location.pathname)}
        />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const supabaseServerClient = createServerSupabaseClient({ req, res });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) {
    return {
      props: {},
      redirect: {
        destination: "/",
        premanent: false,
      },
    };
  }

  // create a record for the new game
  const { data } = await supabaseServerClient
    .from("game_results")
    .insert({
      user_id: user?.id,
      id: v4(),
      type: "tic-tac-toe",
    })
    .select()
    .single();

  return {
    props: {
      gameId: data.id,
    },
  };
};

export default TicTacToeGame;
