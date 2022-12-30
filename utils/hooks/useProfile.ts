import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export interface Profile {
    countWon: number | null;
    countLost: number | null;
    countDraw: number | null;
    countTotal: number | null;
}

export function useProfile() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    ;(async function () {
      try {
        setLoading(true)

        const { count: countTotal} = await supabase
          .from('game_results')
          .select('*', {count: 'exact'})
          .eq('user_id', user?.id)

        const { count: countWon } = await supabase
          .from('game_results')
          .select('*', {count: 'exact'})
          .eq('user_id', user?.id)
          .eq('outcome', 'won')

        const { count: countDraw } = await supabase
          .from('game_results')
          .select('*', {count: 'exact'})
          .eq('user_id', user?.id)
          .eq('outcome', 'draw')

        const { count: countLost } = await supabase
          .from('game_results')
          .select('*', {count: 'exact'})
          .eq('user_id', user?.id)
          .eq('outcome', 'lost')

        console.log('DATA', countWon, countTotal, countDraw, countLost)

        if (error) {
          throw error
        }

        setProfile({
            countWon,
            countTotal,
            countDraw,
            countLost
        })

      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [user]);

  return { loading, error, profile }
}