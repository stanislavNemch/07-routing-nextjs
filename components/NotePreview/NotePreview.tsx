"use client";

import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import type { Note } from "@/types/note";

const NotePreview = ({ note }: { note: Note }) => {
    const router = useRouter();

    return (
        <div className={css.previewContainer}>
            <button onClick={() => router.back()} className={css.closeButton}>
                &times;
            </button>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                    <span className={css.tag}>{note.tag}</span>
                </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>
                    Created: {new Date(note.createdAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default NotePreview;
