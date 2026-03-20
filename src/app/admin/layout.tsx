import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — ABTG Landing Factory',
  description: 'Dashboard admin per il sistema di landing page ABTG',
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      {children}
    </div>
  )
}
