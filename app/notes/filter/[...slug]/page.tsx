import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
    params: {
        slug: string[]; // slug будет массивом, например ['Work']
    };
}

export default async function NotesFilterPage({ params }: NotesPageProps) {
    const queryClient = new QueryClient();

    // Извлекаем тег из slug. Если slug отсутствует или равен 'All', тег пустой.
    const tag =
        params.slug?.[0] && params.slug[0] !== "All" ? params.slug[0] : "";

    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, tag],
        queryFn: () => fetchNotes({ page: 1, query: "", tag }), // Передаем тег в запрос
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {/* Передаем тег как пропс в клиентский компонент */}
            <NotesClient tag={tag} />
        </HydrationBoundary>
    );
}
