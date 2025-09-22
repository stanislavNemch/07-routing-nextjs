import Link from "next/link";
import css from "./TagsMenu.module.css";

const TagsMenu = () => {
    // Определяем теги, включая "All" для сброса фильтра
    const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton}>Notes ▾</button>
            <ul className={css.menuList}>
                {tags.map((tag) => (
                    <li key={tag} className={css.menuItem}>
                        <Link
                            href={`/notes/filter/${tag}`}
                            className={css.menuLink}
                        >
                            {/* Для тега "All" показываем более понятный текст */}
                            {tag === "All" ? "All notes" : tag}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TagsMenu;
