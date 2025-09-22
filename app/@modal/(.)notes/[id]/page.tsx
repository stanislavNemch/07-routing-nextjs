import Modal from "@/components/Modal/Modal";
import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview";
import { fetchNoteById } from "@/lib/api";
import { Suspense } from "react";

// Типизируем `params` как Promise
interface NoteModalProps {
    params: Promise<{ id: string }>;
}

export default async function NoteModal({ params }: NoteModalProps) {
    // Явно ожидаем (await) на Promise, чтобы получить id
    const { id } = await params;
    const note = await fetchNoteById(id);

    return (
        <Suspense fallback={<div>Loading note...</div>}>
            <Modal>
                <NotePreview note={note} />
            </Modal>
        </Suspense>
    );
}
