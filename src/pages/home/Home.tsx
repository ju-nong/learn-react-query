import { useState } from "react";
import { Profile, TheForm } from "../../components/home";

function Home() {
    const [login, setLogin] = useState("ju-nong");

    return (
        <div>
            <TheForm onSubmit={(_login) => setLogin(_login)} />
            <Profile login={login} />
        </div>
    );
}

export { Home as default };
