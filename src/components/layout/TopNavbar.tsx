import { useState } from 'react';
import { Bell, ChevronDown, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function TopNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search symbol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-64 rounded-md border border-input bg-background pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center rounded-md border border-input px-3 py-1 text-sm">
          <span className="font-medium">NIFTY 50:</span>
          <span className="ml-2 text-green-500">22,456.80</span>
          <span className="ml-1 text-xs text-green-500">+0.75%</span>
        </div>

        <button
          onClick={toggleTheme}
          className="rounded-full p-2 hover:bg-accent"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <button className="rounded-full p-2 hover:bg-accent" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 rounded-full hover:bg-accent"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            <div className="h-8 w-8 overflow-hidden rounded-full bg-primary">
              <img
                src="/placeholder-avatar.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                }}
              />
            </div>
            <ChevronDown className="h-4 w-4" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md border bg-popover shadow-lg">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">Account Settings</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-accent">Sign out</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
