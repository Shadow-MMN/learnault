import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learnault - Learn, Earn, and Transform Your Future',
  description: 'Join millions of learners earning real rewards through quality education powered by blockchain technology.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}