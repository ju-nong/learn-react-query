import React from "react";
import { useQuery } from "react-query";

type ProfileProps = {
    login: string;
};

type ProfileResponse = {
    avatar_url: string;
    name: string | null;
    bio: string | null;
    followers: number;
    following: number;
    company: string | null;
    location: string | null;
    email: string | null;
    blog: string;
};

async function fetchProfile(login: string) {
    const reponse = await fetch(`https://api.github.com/users/${login}`);

    if (!reponse.ok) {
        throw new Error("ERROR");
    }

    return await reponse.json();
}

function Profile({ login }: ProfileProps) {
    const { data, isFetching, isError, refetch } = useQuery<ProfileResponse>(
        ["profile", login],
        () => fetchProfile(login),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: Infinity,
            cacheTime: Infinity,
        },
    );

    if (isFetching) {
        return <div className="profile-container text-center">Loading...</div>;
    }

    if (isError) {
        return (
            <div className="profile-container text-center">Not Found 404!</div>
        );
    }

    if (data) {
        const {
            avatar_url,
            name,
            bio,
            followers,
            following,
            company,
            location,
            email,
            blog,
        } = data;
        return (
            <div className="profile-container">
                <div>
                    <img src={avatar_url} />
                </div>
                <div>
                    {name ? (
                        <h3 className="text-[24px] leading-[1.25] font-semibold">
                            {name}
                        </h3>
                    ) : null}
                    <span className="text-[20px] font-light text-[#666e77]">
                        {login}
                    </span>
                </div>
                <button onClick={() => refetch()}>Refetch</button>
                {bio ? (
                    <div>
                        <p>{bio}</p>
                    </div>
                ) : null}
                <div className="flex items-center text-[#666e77]">
                    <svg
                        fill="#656d76"
                        aria-hidden="true"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        data-view-component="true"
                    >
                        <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
                    </svg>
                    <span className="text-black font-semibold mx-1">
                        {followers.toLocaleString()}
                    </span>
                    followers
                    <span className="ml-1">·</span>
                    <span className="text-black font-semibold mx-1">
                        {following.toLocaleString()}
                    </span>
                    following
                </div>
                <ul>
                    {company ? (
                        <li>
                            <svg
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                height="16"
                                aria-hidden="true"
                                fill="#656d76"
                            >
                                <path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.766.766 0 0 1-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 0 1-.75-.75V14h-1v1.25a.75.75 0 0 1-.75.75Zm-.25-1.75c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25ZM3.75 6h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 3.75A.75.75 0 0 1 3.75 3h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 3.75Zm4 3A.75.75 0 0 1 7.75 6h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 7 6.75ZM7.75 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 9.75A.75.75 0 0 1 3.75 9h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 9.75ZM7.75 9h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Z"></path>
                            </svg>

                            <span>{company}</span>
                        </li>
                    ) : null}
                    {location ? (
                        <li>
                            <svg
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                height="16"
                                aria-hidden="true"
                                fill="#656d76"
                            >
                                <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path>
                            </svg>
                            <span>{location}</span>
                        </li>
                    ) : null}
                    {email ? (
                        <li>
                            <svg
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                height="16"
                                aria-hidden="true"
                                fill="#656d76"
                            >
                                <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z"></path>
                            </svg>
                            <span>{email}</span>
                        </li>
                    ) : null}
                    {blog ? (
                        <li>
                            <svg
                                aria-hidden="true"
                                height="16"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                data-view-component="true"
                                fill="#656d76"
                            >
                                <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path>
                            </svg>
                            <span>{blog}</span>
                        </li>
                    ) : null}
                </ul>
            </div>
        );
    }
}

export { Profile as default };
