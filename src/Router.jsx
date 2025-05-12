import { createBrowserRouter } from "react-router-dom";
import RootLayOut from "./LayOuts/RootlayOut";
import ErrorPage from "./Components/Fixed/ErrorPage";
import { HomeLayOuts } from "./LayOuts/HomeLayOuts";
import LoginPage from "./Auth/Users/Loginpage";
import PrivetRout from "./Auth/Privet/Privetrought";
import AllArticles from "./AllArticles.jsx/AllArticles";
import ArticleDetails from "./AllArticles.jsx/ArticleDetails";
import AddArticle from "./AllArticles.jsx/AddArticle";
import SignupPage from "./Auth/Users/SignupPage";
import AboutUs from "./AboutUs/AboutUs";
import ProfileLayout from "./LayOuts/ProfileLayout";
import MyProfile from "./Profiles/MyProfile";
import MyArticles from "./Profiles/MyArticals";
import MyReviews from "./Profiles/MyReviews";
import Subscription from "./Profiles/Subscription";
import Dashboard from "./Profiles/Dashboard";
import AllUsers from "./Profiles/AllUsers";
import AllArticlesAdmin from "./Profiles/AllArticlesAdmin";


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

            //-----------all article related-------------
            {
                path: "/all-articles",
                element: <PrivetRout><AllArticles /></PrivetRout>
            },
            {
                path: "/add-article",
                element: <PrivetRout><AddArticle /></PrivetRout>
            },
            {
                path: `/article/:id`,
                element: <PrivetRout><ArticleDetails /></PrivetRout>,
                loader: ({ params }) => fetch(`http://localhost:5000/News/${params.id}`)
            },

            //-----------about us related-------------
            {
                path: "/AboutUs",
                element: <AboutUs />
            },

        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <SignupPage />
    },
    {
        path: "/profilePage",
        element: <PrivetRout><ProfileLayout /></PrivetRout>,
        children: [
            {
                path: "/profilePage/profile",
                element: <PrivetRout><MyProfile /></PrivetRout>,
            },
            {
                path: "/profilePage/user/my-articles",
                element: <PrivetRout><MyArticles /></PrivetRout>,
            },
            {
                path: "/profilePage/user/reviews",
                element: <PrivetRout><MyReviews /></PrivetRout>,
            },
            {
                path: "/profilePage/user/subscription",
                element: <PrivetRout><Subscription /></PrivetRout>,
            },
            //--------------------for admin--------------------
            {
                path: "/profilePage/dashboard",
                element: <PrivetRout><Dashboard /></PrivetRout>,
            },
            {
                path: "/profilePage/users",
                element: <PrivetRout><AllUsers /></PrivetRout>,
            },
            {
                path: "/profilePage/articles",
                element: <PrivetRout><AllArticlesAdmin /></PrivetRout>,
            },
        ]
    },
]);

export default router;