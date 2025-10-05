import LayoutNotes from "@/components/LayoutNotes/LayoutNotes";


export default function NotesLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <LayoutNotes>
      <aside>{sidebar}</aside>
      <section>{children}</section>
    </LayoutNotes>
  );
}