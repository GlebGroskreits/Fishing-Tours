import { ABOUT_ROUTE, AUTHORIZATION_ROUTE, MAIN_ROUTE, REVIEW_ROUTE, SELECT_TOUR_ROUTE, TOUR_ROUTE, VIP_TOUR_ROUTE, WORKSPACE_ROUTE, LOGIN_ROUTE } from "./utils/consts";
import { Main, About, Tour, Authorization, Review, SelectTour, TourVIP, Workspace } from "./utils/components";

export const clientRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: TOUR_ROUTE,
        Component: Tour
    },
    {
        path: VIP_TOUR_ROUTE,
        Component: TourVIP
    },
    {
        path: SELECT_TOUR_ROUTE,
        Component: SelectTour
    },
    {
        path: AUTHORIZATION_ROUTE,
        Component: Authorization
    },
    {
        path: REVIEW_ROUTE,
        Component: Review
    },
    {
        path: WORKSPACE_ROUTE,
        Component: Workspace
    },
    {
        path: LOGIN_ROUTE,
        Component: Authorization
    },
]

// export const adminRoutes = [
//     {

//     }
// ]