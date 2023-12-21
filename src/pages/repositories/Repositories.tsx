import { useQuery } from "react-query";

import {
    RepositoryItem,
    RepositoryItemProps,
} from "../../components/repositories";

async function fetchRepositories(): Promise<RepositoryItemProps[]> {
    const response = await fetch(
        `https://api.github.com/users/ju-nong/repos?sort=updated`,
        {
            cache: "no-cache",
        },
    );

    if (!response.ok) {
        throw new Error("ERROR");
    }

    return await response.json();
}

function Repositories() {
    const { data, isFetching, isError } = useQuery<RepositoryItemProps[]>(
        "repositories",
        fetchRepositories,
        {
            retry: false,
            staleTime: 60000,
            cacheTime: 60000,
        },
    );

    if (isFetching) {
        return <div className="text-center">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center">X__X Error!</div>;
    }

    if (data && data.length) {
        return (
            <ul className="list-container">
                {data.map((repository) => (
                    <RepositoryItem {...repository} key={repository.name} />
                ))}
            </ul>
        );
    }

    return (
        <div className="text-center mt-8 p-8 font-semibold text-lg">
            ju-nong doesn’t have any public repositories yet.
        </div>
    );
}

export { Repositories as default };
