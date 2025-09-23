"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";

type Props = {
    noteId: string;
    onClose?: () => void;
};

const NotePreview = ({ noteId, onClose }: Props) => {
    const router = useRouter();
    const handleClose = onClose ?? (() => router.back());

    const {
        data: note,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["note", noteId],
        queryFn: () => fetchNoteById(noteId),
    });

    if (isLoading) {
        return <div className={css.container}>Loading note...</div>;
    }

    if (isError) {
        return (
            <div className={css.container}>
                <button onClick={handleClose} className={css.backBtn}>
                    &larr; Back
                </button>
                <div className={css.item}>
                    <p className={css.content}>
                        Failed to load note
                        {error instanceof Error ? `: ${error.message}` : ""}
                    </p>
                </div>
            </div>
        );
    }

    if (!note) return null;

    return (
        <div className={css.container}>
            <button onClick={handleClose} className={css.backBtn}>
                &larr; Back
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
