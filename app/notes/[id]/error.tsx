
"use client";

import css from "./error.module.css";

export default function NoteError() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Oops! Something went wrong.</h1>
      <p className={css.description}>Could not load this note.</p>
    </div>
  );
}
