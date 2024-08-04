import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import { UiProvider } from "./context/UiContext";
import {
  ColasPage,
  EscritorioPage,
  LoginPage,
  Root,
  TicketPage,
} from "./pages";

export const ColasApp = () => {
  return (
    <>
      <SocketProvider>
        <UiProvider>
          <RouterProvider router={router} />
        </UiProvider>
      </SocketProvider>
    </>
  );
};

/* Enrutador */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/colas",
        element: <ColasPage />,
      },
      {
        path: "/escritorio",
        element: <EscritorioPage />,
      },
      {
        path: "/ingreso",
        element: <LoginPage />,
      },
      {
        path: "/crear-ticket",
        element: <TicketPage />,
      },
      {
        path: "/",
        element: <Navigate to={"/ingreso"} />,
      },
    ],
  },
]);
