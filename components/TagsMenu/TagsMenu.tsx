'use client';

import Link from 'next/link';
import css from './TagsMenu.module.css';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

interface TagsMenuProps {
  currentTag?: string;
}

export default function TagsMenu({ currentTag = 'All' }: TagsMenuProps) {
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>
        Notes ▾
      </button>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={tag === 'All' ? '/notes/filter' : `/notes/filter/${tag}`}
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
