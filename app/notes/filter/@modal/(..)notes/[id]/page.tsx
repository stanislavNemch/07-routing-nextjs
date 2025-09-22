import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import { Suspense } from "react";

export default async function NoteModal({
    params: { id },
}: {
    params: { id: string };
}) {
    // Получаем данные для конкретной заметки
    const note = await fetchNoteById(id);

    return (
        <Suspense fallback={<div>Loading note...</div>}>
            <Modal>
                <NotePreview note={note} />
            </Modal>
        </Suspense>
    );
}
