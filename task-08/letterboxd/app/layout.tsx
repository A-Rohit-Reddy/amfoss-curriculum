// app/layout.tsx
import '../styles/globals.css'
import {UserProvider} from '../context/UserContext'
import {WatchlistProvider} from '../context/Watchlist'

export const metadata = {
    title: 'My App',
    description: 'Welcome to my app',
  };
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className='body'>
          <UserProvider>
            <WatchlistProvider>
              {children}
            </WatchlistProvider>
          </UserProvider>
        </body>
      </html>
    );
  }
  