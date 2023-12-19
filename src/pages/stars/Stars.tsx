import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
    SearchBar,
    SelectBoxContainer,
    StarList,
    StarItemProps,
} from "../../components/stars";

async function fetchStars(): Promise<StarItemProps[]> {
    const reponse = await fetch(`https://api.github.com/users/ju-nong/starred`);

    return await reponse.json();
}

function Stars() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [loaded, setLoaded] = useState(false);
    const [stars, setStars] = useState<StarItemProps[]>([]);

    const searched = useMemo(() => {
        let _stars = stars;

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

        return _stars;
    }, [stars, searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            const star = await fetchStars();

            setStars(star);
            setLoaded(true);
        };

        fetchData();
    }, []);

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
            {loaded ? <StarList list={searched} /> : null}
        </div>
    );
}

export { Stars as default };
