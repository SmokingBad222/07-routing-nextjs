import css from './Sidebar.module.css';
import Link from 'next/link';

const tags = ['All', 'Work', 'Personal', 'Ideas', 'Other'];

export default function SidebarNotes() {
    return (
        <aside className={css.sidebar}>
        <ul className={css.menuList}>
            {tags.map((tag) => (
                <li key={tag} className={css.menuItem}>
                    <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
            >
              {tag}
            </Link>
                </li>
            ))}

        </ul>
        </aside>
    );
}