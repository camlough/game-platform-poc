import { AuthSession } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Menu } from './Menu'

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>Game Platform POC</title>
      </Head>
      <div>
        <header>
          <Menu />
        </header>
        <main>{children}</main>
        <footer>
          Powered by Next.js &amp; Supabase
        </footer>
      </div>
    </>
  )
}
