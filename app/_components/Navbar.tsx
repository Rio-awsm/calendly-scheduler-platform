import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import AuthModal from "./AuthModal";

const Navbar = () => {
  return (
    <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
      <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} className="size-10" alt="Logo" />

          <h4 className="text-3xl font-bold">
            Calen<span className="text-blue-500">dra.io</span>
          </h4>
        </Link>
        <div className="md:hidden">Theme toggle</div>
      </div>

      <nav className="hidden md:flex md:justify-end md:space-x-4">
      {/* Theme toggle */}

      <AuthModal />
      </nav>
    </div>
  );
};

export default Navbar;
