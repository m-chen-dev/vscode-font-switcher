import React, { useId, useState, useRef, forwardRef, useEffect } from "react";
import { X } from "react-feather";
import type { FontList } from "./electron";

async function loadFonts(): Promise<FontList> {
    try {
        const fonts = await window.electronAPI.loadFonts();
        return fonts;
    } catch (error) {
        console.error(error);
        return [];
    }
}

type FontViewerProps = {
    fonts: FontList;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const FontViewer = ({ fonts, onClick }: FontViewerProps) => {
    return (
        <div
            className="flex-1 overflow-y-auto grid gap-2
            grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
       auto-rows-[200px]"
        >
            {fonts.map((font, key) => {
                return (
                    <button
                        onClick={onClick}
                        className="flex flex-col hover:bg-zinc-800/65 rounded-md items-center cursor-pointer
                      bg-zinc-900 p-2"
                        key={key}
                    >
                        <h3 className="text-zinc-200">{font.name}</h3>
                    </button>
                );
            })}
        </div>
    );
};

type MainFontInterfaceProps = {
    fonts: FontList | null;
    search: string;
    onFontItemClick: (name: string) => void;
};
const MainFontInterface = ({
    fonts,
    search,
    onFontItemClick,
}: MainFontInterfaceProps) => {
    const cleanSearch = search.trim().toLowerCase();
    fonts =
        fonts?.filter((font) =>
            cleanSearch.length > 0
                ? font.name.toLowerCase().includes(cleanSearch)
                : true,
        ) ?? null;

    return (
        <>
            {fonts && fonts.length > 0 ? (
                <FontViewer fonts={fonts} onClick={(e) => onFontItemClick(e.currentTarget.textContent)} />
            ) : (
                <p className="p-2 text-2xl">No fonts to display</p>
            )}
        </>
    );
};

type SearchProps = {
    search: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onClear: React.MouseEventHandler<HTMLButtonElement>;
};
const Search = forwardRef<HTMLInputElement, SearchProps>(
    ({ search, onChange, onClear }, ref) => {
        const id = useId();

        return (
            <div className="flex 
            items-center rounded-md ring-1 ring-zinc-800 bg-zinc-900 focus-within:ring-[oklch(70%_0_0)]">
                <input
                    placeholder="Enter Font Name"
                    className="flex-1 p-2 [&::-webkit-search-cancel-button]:appearance-none
                rounded-md outline-none not-placeholder-shown:[&~button]:flex"
                    value={search}
                    ref={ref}
                    onChange={onChange}
                    type="search"
                    name={id}
                    id={id}
                />
                <button
                    onClick={onClear}
                    className="justify-center items-center hidden px-2"
                >
                    <span>
                        <X className="size-5" />
                    </span>
                </button>
            </div>
        );
    },
);

const App = () => {
    const [fonts, setFonts] = useState<FontList | null>(null);
    const [search, setSearch] = useState("");
    const searchRef = useRef<HTMLInputElement | null>(null);
    const loadedFontsRef = useRef<FontList | null>(null);

    useEffect(() => {
        async function load() {
            const loadedFonts = await loadFonts();
            loadedFontsRef.current = loadedFonts;
            setFonts(loadedFonts);
        }
        
        load();
    }, []);

    const onFontItemClick = (name: string) => {
        console.log(name);
    };

    const onClear = () => {
        setSearch("");
        const searchInput = searchRef.current;
        if (!searchInput) {
            return;
        }
        searchInput.focus();
    };

    return (
        <div className="min-h-screen flex flex-col px-2 gap-1 bg-zinc-950 text-white">
            <div className="sticky top-1">
                <Search
                    search={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={onClear}
                    ref={searchRef}
                />
            </div>
            <div className="flex flex-col py-2 flex-1 gap-2">
                <MainFontInterface
                    search={search}
                    onFontItemClick={onFontItemClick}
                    fonts={fonts}
                />
            </div>
        </div>
    );
};

export default App;
