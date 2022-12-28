import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import Router from 'next/router'
import { supabase } from '../utils/supabaseClient'

export interface Props {
  session: AuthSession | null
}

export function Menu({ session }: Props) {
  return (
    <ul className="flex space-x-4">
      {session ? (
        <>
          <li>
            <button
              className="btn-link"
              onClick={() => {
                supabase.auth.signOut()
                Router.push('/')
              }}
            >
              Sign out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/login">
              Sign In
            </Link>
            <Link href="/register">
              Sign Up
            </Link>
          </li>
        </>
      )}
    </ul>
  )
}
