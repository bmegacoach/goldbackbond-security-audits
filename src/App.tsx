import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WarRoomHeader } from './components/WarRoomHeader';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import { VerificationPage } from './pages/VerificationPage';
import { ProcessPage } from './pages/ProcessPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { GuardianPage } from './pages/GuardianPage';
import { Footer } from './components/Footer';
import { StripeProvider } from './context/StripeContext';
import { StatisticsProvider } from './context/StatisticsContext';
import './index.css';

function App() {
  return (
    <StripeProvider>
      <StatisticsProvider>
        <Router>
          <div className="min-h-screen bg-void-black text-text-main">
            {/* War Room Header - Global */}
            <WarRoomHeader />
            
            {/* Main Content */}
            <main className="pt-20">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/guardian" element={<GuardianPage />} />
                <Route path="/verification" element={<VerificationPage />} />
                <Route path="/process" element={<ProcessPage />} />
                <Route path="/payment-success" element={<PaymentSuccessPage />} />
              </Routes>
            </main>
            
            {/* Footer */}
            <Footer />
          </div>
        </Router>
      </StatisticsProvider>
    </StripeProvider>
  );
}

export default App;