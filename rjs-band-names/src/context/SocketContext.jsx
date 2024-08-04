import { createContext } from "react";
import { useSocket } from "../hooks";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const { online, socket } = useSocket("http://localhost:3000");

	return (
		<SocketContext.Provider
			value={{
				online,
				socket,
			}}>
			{children}
		</SocketContext.Provider>
	);
};
