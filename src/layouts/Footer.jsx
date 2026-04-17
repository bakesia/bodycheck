export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-10 px-8 mt-auto w-full">
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-[10px] text-gray-600 font-bold tracking-widest uppercase">
            © 2026 BUILDLOG Team. All rights reserved.
          </p>
        </div>

        <nav className="flex space-x-10 text-[10px] font-black text-gray-400 tracking-tighter">
          <a href="#" className="hover:text-black transition-colors uppercase">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-black transition-colors uppercase">
            Terms of Service
          </a>
          <a href="#" className="hover:text-black transition-colors uppercase">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
