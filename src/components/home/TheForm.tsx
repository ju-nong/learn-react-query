import React, { useState } from "react";

type TheFormProps = {
    onSubmit: (login: string) => void;
};

function TheForm({ onSubmit }: TheFormProps) {
    const [login, setLogin] = useState("ju-nong");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        onSubmit(login);
    }

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        setLogin(event.target.value);
    }

    return (
        <form
            className="flex items-center justify-center gap-x-2 mt-4"
            onSubmit={handleSubmit}
        >
            <input
                className="py-[5px] px-[8px] border rounded-md border-gray-300 border-solid h-8 focus:border-transparent outline-blue-600"
                placeholder="name"
                value={login}
                onInput={handleInput}
            />

            <button>Search</button>
        </form>
    );
}

export { TheForm as default };
