import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";

export const metadata: Metadata = {
    title: "NoteHub",
    description: "Your personal space for notes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${GeistSans.variable} ${GeistMono.variable}`}
        >
            <body>
                <TanStackProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </TanStackProvider>
            </body>
        </html>
    );
}
