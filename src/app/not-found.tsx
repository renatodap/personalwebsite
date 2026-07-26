import Link from "next/link";

/** A page on his domain, so it gets the world rather than the framework default. */
export default function NotFound() {
  return (
    <main className="fallback">
      <p>There is nothing at this address.</p>
      <Link href="/">Back to the start</Link>
    </main>
  );
}
