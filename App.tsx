import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Gallery from './pages/Gallery';
import Auth from './pages/Auth';

const App: React.FC = () => {
  // Simple state-based routing since we can't use React Router DOM easily in this constraint
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'editor':
        return <Editor />;
      case 'gallery':
        return <Gallery />;
      case 'auth':
        return <Auth onLogin={() => { setIsAuthenticated(true); setCurrentPage('dashboard'); }} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
