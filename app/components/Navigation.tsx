import Link from "next/link";
import MenuDrawer from "./MenuDrawer";

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-20 mix-blend-difference">
      <MenuDrawer />

      {/* Logo */}
      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2 text-white text-xl md:text-4xl font-medium tracking-tight z-10"
      >
        Anastasia Christou
      </Link>

      {/* CTA */}
      <Link
        href="/contact"
        className="group/roll relative overflow-hidden text-white text-xl font-medium z-10 hidden sm:block"
      >
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover/roll:-translate-y-full">
          Book a session
        </span>
        <span className="absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover/roll:-translate-y-full" aria-hidden="true">
          Book a session
        </span>
      </Link>
    </header>
  );
}
