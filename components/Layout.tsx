import React from 'react';
import { Menu, User as UserIcon, LogOut, Home, PenTool, Image as ImageIcon } from 'lucide-react';
import { APP_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const NavItem = ({ page, icon: Icon, label }: { page: string; icon: any; label: string }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        activePage === page 
          ? 'bg-surfaceHighlight text-primary shadow-neon-cyan' 
          : 'text-gray-400 hover:text-white hover:bg-surfaceHighlight'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-background text-gray-100 flex flex-col font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-black shadow-neon-cyan">
                X
              </div>
              <span className="text-xl font-bold tracking-tight">{APP_NAME}</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <NavItem page="home" icon={Home} label="Home" />
              <NavItem page="editor" icon={PenTool} label="Editor" />
              <NavItem page="gallery" icon={ImageIcon} label="Gallery" />
              <div className="h-6 w-px bg-white/10 mx-2"></div>
              <button 
                onClick={() => onNavigate('auth')}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                <UserIcon size={18} />
                <span>Login</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 hover:text-white">
                <Menu />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface border-b border-white/10 px-2 pt-2 pb-3 space-y-1">
            <NavItem page="home" icon={Home} label="Home" />
            <NavItem page="editor" icon={PenTool} label="Editor" />
            <NavItem page="gallery" icon={ImageIcon} label="Gallery" />
            <NavItem page="auth" icon={UserIcon} label="Login" />
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      
      {/* Minimal Footer */}
      <footer className="border-t border-white/5 py-4 bg-black text-center text-xs text-gray-600">
        <p>© 2024 {APP_NAME}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
