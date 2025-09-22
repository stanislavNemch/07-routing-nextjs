import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";

export default async function NoteModal({
    params: { id },
}: {
    params: { id: string };
}) {
    const router = useRouter();
    const note = await fetchNoteById(id);

    return (
        <Modal isOpen={true} onClose={() => router.back()}>
            <NotePreview note={note} />
        </Modal>
    );
}
