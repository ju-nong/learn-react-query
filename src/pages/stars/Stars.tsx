import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
    SearchBar,
    SelectBoxContainer,
    StarList,
    StarItemProps,
} from "../../components/stars";
import { useQuery } from "react-query";

async function fetchStars(): Promise<StarItemProps[]> {
    const response = await fetch(
        `https://api.github.com/users/ju-nong/starred`,
        {
            cache: "no-cache",
        },
    );

    if (!response.ok) {
        throw new Error("ERROR");
    }

    return await response.json();
}

function Stars() {
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, isFetching, isError } = useQuery<StarItemProps[]>(
        "stars",
        fetchStars,
        {
            retry: false,
            staleTime: 60000,
            cacheTime: 60000,
        },
    );

    const searched = useMemo(() => {
        if (!data) {
            return [];
        }

        let _stars = data;

        const keyword = searchParams.get("keyword");
        if (keyword) {
            _stars = _stars.filter(
                (star) =>
                    star.owner.login.includes(keyword) ||
                    star.name.includes(keyword) ||
                    star.description.includes(keyword),
            );
        }

        const type = searchParams.get("type");
        if (type && type !== "all") {
            _stars = _stars.filter(() => type === "public");
        }

        const language = searchParams.get("language");
        if (language && type !== "all") {
            _stars = _stars.filter((star) => star.language === language);
        }

        const sort = searchParams.get("sort");
        if (sort && sort !== "recent") {
            if (sort === "fork") {
                _stars = _stars.sort((a, b) => b.forks - a.forks);
            } else {
                _stars = _stars.sort(
                    (a, b) => b.stargazers_count - a.stargazers_count,
                );
            }
        }

        console.log(_stars);

        return _stars;
    }, [data, isFetching, searchParams]);

    function handleSubmit(keyword: string) {
        const params = Object.fromEntries(searchParams.entries());
        params.keyword = keyword;

        setSearchParams(params);
    }

    function handleSetCategory(type: string, value: string) {
        const params = Object.fromEntries(searchParams.entries());
        params[type] = value;

        setSearchParams(params);
    }

    return (
        <div className="stars-container pt-4">
            <div className="flex gap-x-4 gap-y-2">
                <SearchBar onSubmit={handleSubmit} />
                <SelectBoxContainer onClick={handleSetCategory} />
            </div>
            {isFetching ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>X__X Error!</div>
            ) : (
                <StarList list={searched} />
            )}
        </div>
    );

    // return (
}

export { Stars as default };
