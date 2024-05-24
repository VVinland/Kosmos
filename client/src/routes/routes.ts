import MainPage from "../pages/Main-page";
import PublicPage from "../pages/Public-page";
import { RouteStructure } from "../types";
import { MAIN_ROUTE, PUBLIC_ROUTE } from "../utils/consts";



const publicRoutes: RouteStructure[] = [
    {
        path: PUBLIC_ROUTE,
        component: PublicPage,
    }
];

const authRoutes: RouteStructure[] = [
    {

        path: MAIN_ROUTE,
        component: MainPage,

    }
];

export {
    publicRoutes,
    authRoutes
}