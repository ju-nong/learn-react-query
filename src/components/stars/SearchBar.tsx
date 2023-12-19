import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type SearchBarProps = {
    onSubmit: (keyword: string) => void;
};

function SearchBar({ onSubmit }: SearchBarProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        const keyword = searchParams.get("keyword");

        if (keyword) {
            setKeyword(keyword);
        }
    }, []);

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        setKeyword(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        onSubmit(keyword);
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-x-2 ">
            <div className="relative w-full">
                <span className="absolute pointer-events-none left-[0.5rem] top-[0.5rem] h-1 w-1">
                    <svg
                        aria-hidden="true"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        data-view-component="true"
                        fill="#656d76"
                    >
                        <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Search stars"
                    className="w-full py-[5px] pl-[32px] pr-[8px] border rounded-md border-gray-300 border-solid h-8 focus:border-transparent outline-blue-600"
                    value={keyword}
                    onInput={handleInput}
                />
            </div>
            <button>Search</button>
        </form>
    );
}

export { SearchBar as default };
