import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="border-b border-gray-200 py-4 px-8 flex justify-between items-center bg-white sticky top-0 z-50">
      <Link to="/" className="font-bold text-2xl tracking-tight text-black">
        BODYCHECK.AI
      </Link>
      <nav className="flex space-x-8 text-sm font-medium text-gray-600">
        <Link
          to="/"
          className="hover:text-gray-950 hover:font-bold transition-all"
        >
          HOME
        </Link>
        <Link
          to="/login"
          className="hover:text-gray-950 hover:font-bold transition-all"
        >
          MY PAGE
        </Link>
        <Link
          to="/about"
          className="hover:text-gray-950 hover:font-bold transition-all"
        >
          ABOUT
        </Link>
      </nav>
    </div>
  );
}
