import { createBrowserRouter } from "react-router-dom";
import RootLayOut from "./LayOuts/RootlayOut";
import ErrorPage from "./Components/Fixed/ErrorPage";
import { HomeLayOuts } from "./LayOuts/HomeLayOuts";
import AllArticles from "./AllArticles/AllArticles";
import LoginPage from "./Auth/Users/Loginpage";
import PrivetRout from "./Auth/Privet/Privetrought";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayOut />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomeLayOuts />
            },
            {
                path: "/all-articles",
                element: <PrivetRout><AllArticles /></PrivetRout>
            },
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    },
]);

export default router;