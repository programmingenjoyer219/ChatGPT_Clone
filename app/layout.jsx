import SideBar from "@/components/SideBar";
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
								<div className="flex">
									<SideBar />

									<ClientProvider />

									<div className="bg-[#343541] flex-1">
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
