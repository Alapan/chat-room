"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setAuthState } from "../state/slices/authSlice";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [logoutBtnLabel, setLogoutBtnLabel] = useState<string>("Logout");
  const dispatch = useAppDispatch();
  const isAuthenticated: boolean = useAppSelector(
    (state) => state.auth.isAuthenticated,
  );
  const router = useRouter();

  const handleLogout = async () => {
    setLogoutBtnLabel("Logging out...");
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({}),
    });
    const data = await response.json();

    if (!response.ok) {
      console.error(data.error || "Error logging out! Please try again.");
    } else {
      dispatch(setAuthState(false));
      setShowMenu(false);
      setLogoutBtnLabel("Logout");
      router.replace("/");
    }
  };

  return (
    <>
      <nav className="flex items-center" onClick={() => setShowMenu(!showMenu)}>
        <div className="md:hidden ml-auto flex flex-col justify-end gap-1 cursor-pointer">
          <div className="w-10 h-2 bg-green rounded-full"></div>
          <div className="w-10 h-2 bg-green rounded-full"></div>
          <div className="w-10 h-2 bg-green rounded-full"></div>
        </div>
      </nav>
      {showMenu && (
        <>
          <div className="md:hidden absolute top-24 right-0 bg-grey text-green w-48 h-auto">
            <ul>
              {isAuthenticated && (
                <li
                  className="py-2 text-center text-2xl cursor-pointer hover:bg-green hover:text-grey border border-green border-y"
                  onClick={handleLogout}
                >
                  {logoutBtnLabel}
                </li>
              )}
            </ul>
          </div>
        </>
      )}

      <div className="hidden md:flex md:justify-end">
        <ul className="flex space-x-4 mr-4">
          {isAuthenticated && (
            <li>
              <Button onClick={handleLogout}>{logoutBtnLabel}</Button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
