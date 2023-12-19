import React from "react";
import { Link } from "react-router-dom";

import LanguageDot from "../LanguageDot";
import { Language } from "../../types";

type RepositoryItemProps = {
    name: string;
    description: string;
    language: Language | null;
};

function RepositoryItem({ name, description, language }: RepositoryItemProps) {
    return (
        <li className="py-4">
            <Link
                className="text-[20px] font-semibold text-[#0969da] hover:underline mr-2"
                to={`/repositories/${name}`}
            >
                {name}
            </Link>
            <span className="rounded-xl border-gray-200 border-solid border px-2 text-[#656d76] font-medium capitalize">
                Public
            </span>
            <p className="text-[#7e6d76] mb-2">{description}</p>
            <div className="text-[#7e6d76] text-[12px] flex items-center gap-x-1">
                {language ? <LanguageDot language={language} /> : null}
                {language}
            </div>
        </li>
    );
}

export { RepositoryItem as default };

export type { RepositoryItemProps };
