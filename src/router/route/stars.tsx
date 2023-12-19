import type { RouteObject } from "react-router-dom";

import { Stars, Detail } from "../../pages/stars";

const routes: RouteObject[] = [
    {
        path: "stars",
        element: <Stars />,
    },
    {
        path: "stars/:owner/:name",
        element: <Detail />,
    },
];

export default routes;
