import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
    params: {
        slug?: string[]; // slug может отсутствовать
    };
}

export default async function NotesFilterPage({ params }: NotesPageProps) {
    const queryClient = new QueryClient();

    // Извлекаем тег. Если slug отсутствует или равен 'All', тег пустой.
    const tag =
        params.slug?.[0] && params.slug[0] !== "All" ? params.slug[0] : "";

    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, "", tag], // Добавляем тег в ключ
        queryFn: () => fetchNotes({ page: 1, query: "", tag }), // и в запрос
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    );
}
