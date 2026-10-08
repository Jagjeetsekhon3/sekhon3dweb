"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="inner-page">
      <div className="page-heading">
        <p className="eyebrow">SEKHON STUDIO</p>
        <h1>
          A moment to
          <br />
          <em>reconnect.</em>
        </h1>
        <p>We couldn’t load this page. Please try again.</p>
        <button className="button black" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
