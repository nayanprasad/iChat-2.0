import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import SocketProvider from "../components/providers/socket-provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "iChat",
    description: "Scalable chat application using Node.js, Socket.io, Next.js, Redis, Postgres, and Kafka",
};

export default function RootLayout({children }: { children: React.ReactNode; }): JSX.Element {
    return (
        <html lang="en">
        <body className={inter.className}>
        <SocketProvider>
            {children}
        </SocketProvider>
        </body>
        </html>
    );
}
