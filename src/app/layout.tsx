import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '../../providers/SupabaseProvider'
import UserProvider from '../../providers/UserProvider'
import ModalProvider from '../../providers/ModalProvider'
import ToasterProvider from '../../providers/ToasterProvider'
import getSongsByUserId from '../../actions/getSongsByUser'
import Player from '@/components/Player'
import getActiveProducts from '../../actions/getActiveProductsWithPrices'

const figtree = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KokoMusic Clone',
  description: 'Listen, create and enjoy music',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProducts()
  return (
    <html lang="en">
      <body className={figtree.className}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products}/>  
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player/>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
