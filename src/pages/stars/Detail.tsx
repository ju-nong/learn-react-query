import { Link, useParams } from "react-router-dom";

function Detail() {
    const params = useParams<{
        owner: string;
        name: string;
    }>();

    const { owner, name } = params;

    return (
        <div className="pt-4">
            <Link
                className="text-[20px]  hover:underline"
                to={`/stars/${owner}/${name}`}
            >
                {owner} / <span className="font-semibold">{name}</span>
            </Link>

            <a
                href={`https://github.com/${owner}/${name}`}
                target="_blank"
                className="text-center w-full block"
            >
                Github
            </a>
        </div>
    );
}

export { Detail as default };
