import { useEffect, useState } from "react";

import {
    RepositoryItem,
    RepositoryItemProps,
} from "../../components/repositories";

async function fetchRepositories(): Promise<RepositoryItemProps[]> {
    const reponse = await fetch(
        `https://api.github.com/users/ju-nong/repos?sort=updated`,
    );

    return await reponse.json();
}

function Repositories() {
    const [repositories, setRepositories] = useState<RepositoryItemProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const repos = await fetchRepositories();
            setRepositories(repos);
        };

        fetchData();
    }, []);

    return (
        <ul className="list-container">
            {repositories.map((repository) => (
                <RepositoryItem {...repository} key={repository.name} />
            ))}
        </ul>
    );
}

export { Repositories as default };
