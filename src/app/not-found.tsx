import Link from "next/link";

export default function NotFound() {
  return (
    <main className="gutter flex min-h-[100svh] flex-col justify-center gap-8">
      <p className="label text-signal-text">Error 404 — Sheet not found</p>
      <h1 className="display text-[clamp(4rem,14vw,12rem)]">
        Out of <em>tolerance.</em>
      </h1>
      <Link href="/" className="label w-fit border border-line-strong px-4 py-3 hover:border-signal">
        ← Back to the title sheet
      </Link>
    </main>
  );
}
