import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Signup" },
  { href: "/profile", label: "Profile" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/activity", label: "Activity" },
  { href: "/settings", label: "Settings" },
];

export function SimpleNav() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
      <Link href="/" className="text-sm font-semibold tracking-[0.25em] text-slate-700 uppercase">
        MF
      </Link>
      <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="underline-offset-4 transition hover:text-slate-900 hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
