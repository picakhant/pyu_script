import Link from "next/link";
import Logo from "./Logo";
import NavBarOauthBtn from "./NavBarOauthBtn";

export default function Navbar() {
  return (
    <div className="bg-base-100/95 md:bg-base-100/80 md:backdrop-blur-md sticky top-0 z-50 border-b border-base-content/10 font-mono transition-colors duration-300">
      <div className="container navbar mx-auto">
        <div className="flex-1">
          <Link href="/" className=" flex items-center gap-2">
            <Logo className="w-12 sm:w-14 h-auto" />
            <span className="text-xl sm:text-2xl tracking-tight hidden sm:block">
              <span className="text-base-content font-bold">Pyu</span>
              <span className="text-primary font-bold">Script</span>
            </span>
          </Link>
        </div>

        <div className="flex-none gap-2">
          <NavBarOauthBtn />
        </div>
      </div>
    </div>
  );
}
