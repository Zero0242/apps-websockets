import { createContext } from "react";
import { useSocket } from "../hooks";
import { envs } from "../config";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const { online, socket } = useSocket(envs.SOCKET_HOST);

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
