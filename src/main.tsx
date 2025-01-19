import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./paginas/Home";
import Create from "./paginas/Create";
import PostPage from "./paginas/postPage";
import useSpeechRecognition from "./paginas/useSpeechRecognition";

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
            {
                path: "/post/:id",
                element: <PostPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);