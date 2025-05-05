import { createBrowserRouter } from "react-router-dom";
import RootLayOut from "./LayOuts/RootlayOut";
import ErrorPage from "./Components/Fixed/ErrorPage";
import { HomeLayOuts } from "./LayOuts/HomeLayOuts";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayOut />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomeLayOuts />
            }
        ]
    }
]);

export default router;