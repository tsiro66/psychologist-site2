import Link from "next/link";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Approach", href: "/approach" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Psychology Today", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Accessibility", href: "#" },
];

export default function Footer() {
  return (
    <footer className="fixed bottom-0 inset-x-0 h-screen z-0 bg-overlay-teal text-foreground flex flex-col justify-between px-6 md:px-10">
      {/* CTA area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <p className="text-sm md:text-base font-light tracking-wide text-white/50">
          Ready to begin?
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-center leading-[1.08] text-white">
          Start your journey
          <br />
          toward healing
        </h2>
        <Link
          href="/contact"
          className="group/roll mt-4 border border-white/25 rounded-full px-10 py-4 text-white text-base md:text-lg font-medium hover:border-white/50 transition-colors duration-500"
        >
          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover/roll:-translate-y-full">
              Book a session
            </span>
            <span
              className="absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover/roll:-translate-y-full"
              aria-hidden="true"
            >
              Book a session
            </span>
          </span>
        </Link>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/10" />

      {/* Links grid + copyright */}
      <div className="py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 mb-10 md:mb-14">
          {/* Navigate */}
          <div>
            <h3 className="text-white/35 text-[11px] uppercase tracking-[0.15em] mb-4">
              Navigate
            </h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/70 text-sm md:text-base font-medium hover:text-white transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Follow */}
          <div>
            <h3 className="text-white/35 text-[11px] uppercase tracking-[0.15em] mb-4">
              Follow
            </h3>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 text-sm md:text-base font-medium hover:text-white transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact — spans right half on md+ */}
          <div className="col-span-2 md:text-right">
            <h3 className="text-white/35 text-[11px] uppercase tracking-[0.15em] mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:hello@anastasiac.com"
                className="text-white/70 text-sm md:text-base font-medium hover:text-white transition-colors duration-300 md:ml-auto w-fit"
              >
                hello@anastasiac.com
              </a>
              <a
                href="tel:+302101234567"
                className="text-white/70 text-sm md:text-base font-medium hover:text-white transition-colors duration-300 md:ml-auto w-fit"
              >
                +30 210 123 4567
              </a>
            </div>
          </div>
        </div>

        {/* Copyright + legal */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-white/25 text-xs md:text-sm">
            &copy; 2026 Anastasia Christou
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/25 text-xs md:text-sm hover:text-white/50 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
