import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'

/**
 * App shell: fixed nav on top, content area filling the rest of the viewport
 * with no outer scroll — individual panels scroll independently.
 */
export function AppShell() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-parchment">
      <TopNav />
      <main className="min-h-0 flex-1">
        <Outlet />
      </main>
    </div>
  )
}
