import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter, Poppins } from "next/font/google";

// Load professional fonts
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
	display: "swap",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	title: "TaskFlow | Task & To-Do Management",
	description:
		"A comprehensive task and to-do management application developed by Basil Ugo",
	keywords:
		"task management, to-do list, productivity, pomodoro timer, task tracking, Basil Ugo, thebasilugo",
	authors: [{ name: "Basil Ugo", url: "https://github.com/thebasilugo" }],
	creator: "Basil Ugo",
	generator: "thebasilugo",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${poppins.variable} ${inter.variable} font-sans antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="max-w-[1600px] mx-auto px-4 md:px-8">{children}</div>
				</ThemeProvider>
			</body>
		</html>
	);
}

import "./globals.css";
