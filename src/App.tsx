import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { MarketTrends } from './pages/MarketTrends';
import { PnLAnalysis } from './pages/PnLAnalysis';
import { Stocks } from './pages/Stocks';
import { Options } from './pages/Options';
import { Futures } from './pages/Futures';
import { Cryptocurrency } from './pages/Cryptocurrency';
import { News } from './pages/News';
import { Screener } from './pages/Screener';
import { ApiIntegration } from './pages/ApiIntegration';
import { DataMapping } from './pages/DataMapping';
import { Settings } from './pages/Settings';
import { ThemeProvider } from './providers/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/market-trends" element={<MarketTrends />} />
            <Route path="/pnl-analysis" element={<PnLAnalysis />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/options" element={<Options />} />
            <Route path="/futures" element={<Futures />} />
            <Route path="/cryptocurrency" element={<Cryptocurrency />} />
            <Route path="/news" element={<News />} />
            <Route path="/screener" element={<Screener />} />
            <Route path="/api-integration" element={<ApiIntegration />} />
            <Route path="/data-mapping" element={<DataMapping />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
