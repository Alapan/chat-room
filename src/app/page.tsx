"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

import { Button } from "./components/Button";
import Link from "next/link";

export default function Home() {
  const { rive, RiveComponent } = useRive({
    src: "/chat.riv",
    autoplay: true,
    artboard: "Main Artboard",
    stateMachines: ["Main"],
  });
  const isMovingInput = useStateMachineInput(rive, "Main", "isMoving");
  const router = useRouter();

  useEffect(() => {
    if (isMovingInput) {
      isMovingInput.value = true;
    }
  }, [isMovingInput]);

  const handleClick = () => {
    console.log("Navigating to login...");
    router.push("/login");
  };

  return (
    <div className="container w-full mx-auto flex flex-col h-screen mb-6">
      <div className="flex flex-col justify-center item-center w-full size-140">
        <RiveComponent />
        <div className="m-auto mt-4 p-4 w-full max-w-sm">
          <Button onClick={handleClick}>Login</Button>
        </div>
        <span className="text-center text-gray-500 text-sm mt-2">
          Don&apos;t have an account?&nbsp;
          <Link
            href="/register"
            className="text-green hover:text-green font-bold"
          >
            Register.
          </Link>
        </span>
      </div>
    </div>
  );
}
