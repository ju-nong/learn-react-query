type Language = "JavaScript" | "TypeScript" | "Vue" | "Python" | "CSS" | "HTML";

type LanguageColorObject = {
    [key in Language]: string;
};

export { Language, LanguageColorObject };
