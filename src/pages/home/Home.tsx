import React, { useState } from "react";
import { Profile } from "../../components/home";

function Home() {
    const [login, setLogin] = useState("ju-nong");
    const [submittedLogin, setSubmittedLogin] = useState("ju-nong");

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        setLogin(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSubmittedLogin(login);
    }

    return (
        <div>
            <Profile login={submittedLogin} />
            <form onSubmit={handleSubmit}>
                <input value={login} onInput={handleInput} />
            </form>
        </div>
    );
}

export { Home as default };
