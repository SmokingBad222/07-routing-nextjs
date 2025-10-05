'use client';

import Link from 'next/link';
import css from './TagsMenu.module.css';
import { useState } from 'react';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];



export default function TagsMenu() {

  const [open, setOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button 
      className={css.menuButton}
      onClick={() => setOpen((prev) => !prev)}
      >
        Notes ▾
      </button>
      {open && (
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={tag === 'All' ? '/notes/filter' : `/notes/filter/${tag}`}
              className={css.menuLink}
              onClick={() => setOpen(false)}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
  )}
    </div>
  );
}
