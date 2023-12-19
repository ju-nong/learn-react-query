import React, { useState } from "react";
import SelectBox, { SelectBoxProps } from "./SelectBox";

type SelectBoxContainerProps = {
    onClick: (type: string, value: string) => void;
};

function SelectBoxContainer({ onClick }: SelectBoxContainerProps) {
    const [selectBoxes, setSelectBoxes] = useState<SelectBoxProps[]>([
        {
            id: "type",
            name: "Type",
            list: [
                {
                    label: "All",
                    value: "all",
                    active: true,
                },
                {
                    label: "Public",
                    value: "public",
                    active: false,
                },
                {
                    label: "Private",
                    value: "private",
                    active: false,
                },
            ],
        },
        {
            id: "language",
            name: "Language",
            list: [
                {
                    label: "All languages",
                    value: "all",
                    active: true,
                },
                {
                    label: "JavaScript",
                    value: "JavaScript",
                    active: false,
                },
                {
                    label: "TypeScript",
                    value: "TypeScript",
                    active: false,
                },
            ],
        },
        {
            id: "sort",
            name: "Sort by",
            list: [
                {
                    label: "Recently starred",
                    value: "recent",
                    active: true,
                },
                {
                    label: "Most forks",
                    value: "fork",
                    active: false,
                },
                {
                    label: "Most stars",
                    value: "star",
                    active: false,
                },
            ],
        },
    ]);

    function handleClick(parent: number, children: number) {
        const { id, list } = selectBoxes[parent];

        setSelectBoxes((selectBoxes) =>
            selectBoxes.map((selectbox, index) =>
                index === parent
                    ? {
                          ...selectbox,
                          list: selectbox.list.map((item, _index) =>
                              _index === children
                                  ? { ...item, active: true }
                                  : { ...item, active: false },
                          ),
                      }
                    : selectbox,
            ),
        );

        onClick(id, list[children].value);
    }

    return (
        <div className="inline-flex gap-2 w-full">
            {selectBoxes.map((selectBox, _index) => (
                <SelectBox
                    {...selectBox}
                    key={selectBox.id}
                    onClick={(index: number) => handleClick(_index, index)}
                />
            ))}
        </div>
    );
}

export { SelectBoxContainer as default };
