import { HeroSection } from '../components/sections/HeroSection';
import { LiveStats } from '../components/sections/LiveStats';
import { FeatureGrid } from '../components/sections/FeatureGrid';
import { ProblemSolution } from '../components/sections/ProblemSolution';
import { TrustSection } from '../components/sections/TrustSection';

export const HomePage = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <LiveStats />
      <FeatureGrid />
      <ProblemSolution />
      <TrustSection />
    </main>
  );
};