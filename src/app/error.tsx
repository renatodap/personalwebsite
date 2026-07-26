"use client";

/**
 * Every frame on this site comes from Postgres over the network, so a database
 * blip is a real state, not a hypothetical. Without this the visitor gets Next's
 * default error page: the one screen on this domain that belongs to no world.
 *
 * Register, not apology. The copy names what happened and what to do, in the
 * same voice as the rest of the site, and there is no em-dash in it.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="fallback">
      <p>The drawings did not load.</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
