import { TheHeader } from "./layout";

import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TheHeader />
            <main>
                <Outlet />
            </main>
            <ReactQueryDevtools
                initialIsOpen={false}
                closeButtonProps={{
                    style: {
                        left: "unset",
                        right: 0,
                    },
                }}
            />
        </QueryClientProvider>
    );
}

export default App;
