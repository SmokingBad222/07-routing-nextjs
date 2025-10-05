import css from './NotePreview.module.css';
import Link from 'next/link';

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function NotePreview({ note }: { note: Note }) {
  return (
    <div className={css.card}>
      <Link href={`/notes/${note.id}`}>
        <h3>{note.title}</h3>
        <p>{note.content.slice(0, 80)}...</p>
      </Link>
    </div>
  );
}