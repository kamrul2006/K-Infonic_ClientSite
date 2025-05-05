import { createBrowserRouter } from "react-router-dom";
import RootLayOut from "./LayOuts/RootlayOut";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayOut />,
    }
]);

export default router;