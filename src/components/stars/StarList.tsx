import React from "react";

import { StarItem, StarItemProps } from "./";

type StarListProps = {
    list: StarItemProps[];
};

function StarList({ list }: StarListProps) {
    return (
        <ul className="list-container">
            {list.length ? (
                list.map((star) => <StarItem {...star} key={star.id} />)
            ) : (
                <div className="text-center mt-8 p-8 font-semibold text-lg">
                    ju-nong doesn’t have any starred repositories yet.
                </div>
            )}
        </ul>
    );
}

export { StarList as default };
