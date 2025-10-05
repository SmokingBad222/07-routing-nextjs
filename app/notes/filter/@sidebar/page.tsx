import css from './Sidebar.module.css';
import Link from 'next/link';

const tags = ['All', 'Work', 'Personal', 'Ideas', 'Other'];

export default function SidebarNotes() {
    return (
        <ul className={css.menuList}>
            {tags.map((tag) => (
                <li key={tag} className={css.menuItem}>
                    <Link
                    href={tag === 'All' ? '/mote/filter/All' : `/notes/filter/${tag}`}
                    >{tag}</Link>
                </li>
            ))}

        </ul>
    );
}