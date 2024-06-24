import SideBar from "@/components/SideBar";
import SidebarToggle from "@/components/SidebarToggle.jsx";
import { SessionProvider } from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import Login from "@/components/Login";
import { authOptions } from "./api/auth/[...nextauth]/route.js";
import ClientProvider from "@/components/ClientProvider.jsx";
import "./globals.css";

export const metadata = {
	title: "ChatGPT Clone",
	description: "I'm building a ChatGPT clone using Next.js"
}

export default async function RootLayout({ children }) {
	const session = await getServerSession(authOptions);
	return (
		<html lang="en">
			<body>
				<SessionProvider session={session}>
					{
						(session)
							?
							(
								<div id="all-content-container" className="flex">
									<ClientProvider />

									<SideBar />

									<div id="children-container" className="bg-[#222222] flex-1 relative">
										{children}
									</div>
								</div>
							)
							:
							(
								<Login />
							)
					}
				</SessionProvider>
			</body>
		</html>
	);
}
