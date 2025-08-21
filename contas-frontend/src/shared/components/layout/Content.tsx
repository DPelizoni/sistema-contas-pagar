"use client";

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-grow-1 overflow-auto p-3 bg-white">{children}</main>
  );
}
