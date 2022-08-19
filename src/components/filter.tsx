import { useState } from "react";

type FilterProps = {
    colours: Array<string | undefined>;
    onColourChanged?: (colour?: string) => void;
};

export const Filter: React.FC<FilterProps> = ({ colours, onColourChanged }) => {
    return (
        <div className="dropdown">
            <label tabIndex={0} className="m-1 flex flex-row items-center">
                <p> Colour Filter </p>
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                <small className="underline ml-4" onClick={() => onColourChanged && onColourChanged()}>
                    <a>clear all</a>
                </small>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                {
                    colours.map(
                        colour => <li onClick={() => onColourChanged && onColourChanged(colour || '')}><a href='#'>{colour}</a></li>
                    )
                }
            </ul>
        </div>
    )
}