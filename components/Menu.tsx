import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import Router from 'next/router'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'


export function Menu() {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  console.log('user', user)
    return (
    <ul className="flex space-x-4">
      {user ? (
        <>
          <li>
            <button
              className="btn-link"
              onClick={() => {
                supabaseClient.auth.signOut()
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
