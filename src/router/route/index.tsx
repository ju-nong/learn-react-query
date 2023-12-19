import type { RouteObject } from "react-router-dom";

import App from "../../App";

import home from "./home";
import repositories from "./repositories";
import stars from "./stars";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [...home, ...repositories, ...stars],
    },
];

export default routes;
