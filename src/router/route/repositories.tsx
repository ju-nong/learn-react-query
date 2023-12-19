import type { RouteObject } from "react-router-dom";

import { Repositories, Detail } from "../../pages/repositories";

const routes: RouteObject[] = [
    {
        path: "repositories",
        element: <Repositories />,
    },
    {
        path: "repositories/:name",
        element: <Detail />,
    },
];

export default routes;
