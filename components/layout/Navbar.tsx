"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import SearchBar from "../SearchBar";
import { logoutAccount } from "@/lib/actions/auth.action";

interface NavbarProps {
  githubUsername: string;
  rowNumber: string;
  avatarUrl: string;
  email: string;
}

export default function Navbar({
  githubUsername,
  rowNumber,
  avatarUrl,
  email,
}: NavbarProps) {
  //  Mobile Search Bar on off State
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <div className="bg-base-100/80 md:backdrop-blur-md sticky top-0 z-50 border-b border-base-content/10 transition-all duration-300">
      {/*  1. Top Row */}
      <div className="container navbar mx-auto px-4 md:px-8">
        {/* Logo Section */}
        <div className="flex-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Logo className="w-10 sm:w-12 h-auto" />
            <span className="text-xl sm:text-2xl tracking-tight hidden sm:block">
              <span className="text-base-content font-bold">Pyu</span>
              <span className="text-primary font-bold">Script</span>
              <span className="text-base-content/40 font-normal ml-1">
                _Vault
              </span>
            </span>
          </Link>
        </div>

        {/*  Desktop Search Section */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <SearchBar />
        </div>

        {/* Profile & Mobile Search Action Section */}
        <div className="flex-none flex items-center gap-1 md:gap-2">
          {/*  Mobile Search Toggle Button */}
          <button
            className={`md:hidden btn btn-circle btn-ghost btn-sm ${isMobileSearchOpen ? "bg-base-200 text-primary" : "text-base-content/70"}`}
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            aria-label="Toggle search"
          >
            {isMobileSearchOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-2 btn btn-ghost rounded-full px-2 hover:bg-base-200 transition-all border border-transparent"
            >
              <div className="avatar">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full ring-2 ring-primary/20 hover:ring-primary transition-all">
                  <img alt="Profile" src={avatarUrl} />
                </div>
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="mt-4 z-1 p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-64 border border-base-300"
            >
              <li className="px-4 py-3 border-b border-base-300 mb-2 pointer-events-none flex flex-col items-start gap-1">
                <span className="block text-sm font-bold text-base-content">
                  {githubUsername}
                </span>
                <span className="block text-xs text-base-content/60 truncate w-full">
                  {email}
                </span>
                <span className="badge badge-primary badge-sm mt-1 font-mono">
                  Row: {rowNumber}
                </span>
              </li>

              <li>
                <Link href="/profile" className="py-2.5 hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 opacity-70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/submit" className="py-2.5 hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2 opacity-70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Submit Project
                </Link>
              </li>
              <div className="divider my-0"></div>
              <li>
                <button
                  onClick={async () => {
                    await logoutAccount();
                  }}
                  className="text-error py-2.5 hover:bg-error/10 hover:text-error"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/*  2. Expandable Mobile Search Section */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileSearchOpen
            ? "max-h-24 opacity-100 border-t border-base-content/10 bg-base-200/30"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-center w-full">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
