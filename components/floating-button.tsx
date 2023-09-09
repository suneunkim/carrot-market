import Link from "next/link";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link
      href={href}
      className="fixed hover:bg-orange-500 border-0 border-transparent transition-colors bottom-28 right-5 shadow-xl bg-orange-400 rounded-full w-14 h-14 flex items-center justify-center text-white"
    >
      {children}
    </Link>
  );
}
