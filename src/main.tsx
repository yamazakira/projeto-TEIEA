import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import useSpeechRecognition from "./components/useSpeechRecognition";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/createpost",
                element: <Create />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);