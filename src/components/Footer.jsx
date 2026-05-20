import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 py-8 px-4 sm:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-3 text-zinc-500">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link to="/" className="hover:text-green-600 transition-colors">
            Home
          </Link>
          <Link
            to="/currencies"
            className="hover:text-green-600 transition-colors"
          >
            Currencies
          </Link>
          <Link
            to="/exchanges"
            className="hover:text-green-600 transition-colors"
          >
            Exchanges
          </Link>
          <Link to="/news" className="hover:text-green-600 transition-colors">
            News
          </Link>
        </div>
        <p className="text-xs">© 2024 CryptoWorld. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
