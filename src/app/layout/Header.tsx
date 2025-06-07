import Image from "next/image";
import { Navbar } from "./Navbar";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="py-2 h-30 bg-grey flex flex-row justify-between items-center">
      <div className="flex flex-col justify-center items-center mx-4">
        <Link href={"/"}>
          <div className="flex flex-row text-6xl">
            <span className="font-bold text-green">Chat</span>
            <span className="font-light text-green pr-4">Hub</span>
            <Image
              src="/speech-bubble.svg"
              width={50}
              height={50}
              alt="Chat Hub Logo"
              priority
            />
          </div>
        </Link>
        <div className="font-cursive text-green text-2xl">
          Chat anytime, for free.
        </div>
      </div>
      <Navbar />
    </header>
  );
};
