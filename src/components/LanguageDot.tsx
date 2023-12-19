import React from "react";
import { Language, LanguageColorObject } from "../types";

const languageColor: LanguageColorObject = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Vue: "#41b883",
    Python: "#3572a5",
    CSS: "#563d7c",
    HTML: "#e34c26",
};

type LanguageDotProps = {
    language: Language;
};

function LanguageDot({ language }: LanguageDotProps) {
    return (
        <span
            className="w-3 h-3 rounded-full bg-black inline-block border-[0.8px] border-solid border-gray-100"
            style={{
                backgroundColor: languageColor[language],
            }}
        ></span>
    );
}

export { LanguageDot as default };
