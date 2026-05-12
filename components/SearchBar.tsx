"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    router.push(
      `/search?q=${encodeURIComponent(searchQuery)}&type=${searchType}`,
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full max-w-sm lg:max-w-md bg-base-200/40 backdrop-blur-md border border-base-content/10 rounded-full px-2 py-1 focus-within:border-primary/50 focus-within:bg-base-200/60 focus-within:shadow-md transition-all duration-300"
    >
      {/* 1. Minimal Dropdown */}
      <div className="relative flex items-center">
        <select
          className="appearance-none bg-transparent border-none text-xs font-mono font-bold text-base-content/70 focus:outline-none focus:ring-0 cursor-pointer pl-3 pr-6 py-2 uppercase tracking-wider"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="title" className="bg-base-200 text-base-content">
            Title
          </option>
          <option
            value="technologies"
            className="bg-base-200 text-base-content"
          >
            Tech
          </option>
        </select>
        <div className="absolute right-1 pointer-events-none text-base-content/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="w-px h-5 bg-base-content/20 mx-2"></div>

      {/* 2. Seamless Input Field */}
      <input
        type="text"
        className="grow bg-transparent border-none focus:outline-none focus:ring-0 text-sm placeholder:text-base-content/40 px-2 w-full text-base-content"
        placeholder="Search the vault..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* 3. Ghost Search Button */}
      <button
        type="submit"
        className="btn btn-ghost btn-sm btn-circle text-base-content/50 hover:text-primary hover:bg-primary/10 transition-colors"
        disabled={!searchQuery.trim()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </form>
  );
}
