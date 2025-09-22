import Link from "next/link";
import css from "./Sidebar.module.css";

interface SidebarNotesProps {
    params: {
        slug: string[];
    };
}

export default function SidebarNotes({ params }: SidebarNotesProps) {
    const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];
    const activeTag = params.slug?.[0] || "All";

    return (
        <aside className={css.sidebar}>
            <h2 className={css.title}>Filter by Tag</h2>
            <ul className={css.menuList}>
                {tags.map((tag) => (
                    <li key={tag} className={css.menuItem}>
                        <Link
                            href={`/notes/filter/${tag}`}
                            // Добавляем класс для активной ссылки
                            className={`${css.menuLink} ${activeTag === tag ? css.active : ""}`}
                        >
                            {tag === "All" ? "All notes" : tag}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
