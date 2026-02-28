export const Footer = () => {
  return (
    <footer className="bg-panel-black/90 border-t border-metallic-gold/20 mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-text-muted font-mono text-sm mb-4">
            © 2024 GOLDBACKBOND SECURITY AUDITS. ALL RIGHTS RESERVED.
          </p>
          <p className="text-gray-500 font-mono text-xs max-w-4xl mx-auto">
            LEGAL DISCLAIMER: The Goldbackbond Security Performance Warranty is a discretionary coverage pool provided by Goldbackbond Ventures. 
            It is not a regulated insurance product. Coverage is strictly limited to direct loss of funds resulting from a failure of the GBB Guardian Node 
            to execute a pause transaction on a known vulnerability. It does not cover private key compromise, phishing, or governance attacks. 
            Liability is capped at the lower of 3% of Protocol TVL or 3x total Audit Fees paid. Financing is subject to asset approval by the GBB Liquidity Desk.
          </p>
        </div>
      </div>
    </footer>
  );
};