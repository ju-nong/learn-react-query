import { TheHeader } from "./layout";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <TheHeader />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default App;
