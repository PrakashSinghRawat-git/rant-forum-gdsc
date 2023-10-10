import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Toast from '@/components/Toast'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RantHub',
  description: 'A place to rant about anything and everything.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-800`}>
        <Navbar />
        {children}
        <Toast />

      </body>
    </html>
  )
}
