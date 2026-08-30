import React, { useId, useState, useRef, forwardRef } from "react";
import { ChevronRight, X } from "react-feather";

type Font = {
    name: string;
    thumbnail?: string;
    styles: FontStyle[];
};

type FontStyle = {
    name: string;
    thumbnail?: string;
    weight?: number;
    width?: number;
    italics?: boolean;
};


function loadFontStyles(name: string): FontStyle[] {
    name = name.toLowerCase();
    switch (name) {
        case "consolas":
            return [
                {
                    name: "Consolas Light",
                    weight: 300,
                    italics: false,
                },
                {
                    name: "Consolas Regular",
                    weight: 400,
                    italics: false,
                },
            ];
        case "jetbrains mono":
            return [
                {
                    name: "Jetbrains Mono Regular",
                    weight: 400,
                    italics: false,
                },
            ];
        default:
            return [];
    }
}

function loadFonts(): Font[] {
    return [
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "Consolas",
            styles: loadFontStyles("consolas"),
        },
        {
            name: "JetBrains Mono",
            styles: loadFontStyles("jetbrains mono"),
        },
    ];
}

type FontViewerProps = {
    fonts: Font[] | FontStyle[];
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const FontViewer = ({ fonts, onClick }: FontViewerProps) => {
    return (
        <div
            className="flex-1 overflow-y-auto grid gap-2
            grid-cols-[repeat(auto-fit,25%)]
      md:grid-cols-[repeat(auto-fit,20%)] auto-rows-[200px]"
        >
            {fonts.map((font, key) => {
                return (
                    <button
                        onClick={onClick}
                        className="flex flex-col rounded-md items-center cursor-pointer
                      bg-zinc-900 p-2"
                        key={key}
                    >
                        <img src={font.thumbnail} alt="" />
                        <h3 className="text-zinc-200">{font.name}</h3>
                    </button>
                );
            })}
        </div>
    );
};

type MainFontInterfaceProps = {
    fonts: Font[] | FontStyle[];
    search: string;
    activeFontName: string | null;
    onFontItemClick: (name: string) => void;
    onVariantClick: React.MouseEventHandler<HTMLButtonElement>;
};
const MainFontInterface = ({
    fonts,
    search,
    activeFontName,
    onFontItemClick,
    onVariantClick,
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
                activeFontName ? (
                    <FontViewer fonts={fonts} onClick={onVariantClick} />
                ) : (
                    <FontViewer
                        fonts={fonts}
                        onClick={(e) =>
                            onFontItemClick(e.currentTarget.textContent)
                        }
                    />
                )
            ) : (
                <p className="p-2 text-2xl">No fonts to display</p>
            )}
        </>
    );
};

type NavigatorProps = {
    activeFontName: string | null;
    onExit: React.MouseEventHandler<HTMLButtonElement>;
};
const Navigator = ({ activeFontName, onExit }: NavigatorProps) => {
    return (
        <div className="bg-[oklch(25%_0_0)] flex p-0.5 items-center sticky top-0">
            <div className="flex items-center gap-0.5">
                <button
                    onClick={onExit}
                    className={`${activeFontName && "hover:bg-zinc-700/70 cursor-pointer"} rounded-md p-1 px-1.5`}
                >
                    Fonts
                </button>
                {activeFontName && (
                    <>
                        <span className="cursor-default text-[oklch(42%_0_0)]">
                            <ChevronRight className="size-[23px]" />
                        </span>
                        <span className="ml-0.5 cursor-default text-[oklch(60%_0_0)]">
                            {activeFontName}
                        </span>
                    </>
                )}
            </div>
        </div>
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
            sticky top-10
            items-center rounded-md ring-2 ring-zinc-800 bg-zinc-900 focus-within:ring-zinc-400">
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

const loadedFonts = loadFonts();

const App = () => {
    const [fonts, setFonts] = useState<Font[] | FontStyle[]>(loadedFonts);
    const [search, setSearch] = useState("");
    const [activeFontName, setActiveFontName] = useState<string | null>(null);
    const searchRef = useRef<HTMLInputElement | null>(null);

    const onFontItemClick = (name: string) => {
        console.log(name);
        setActiveFontName(name);
        setFonts(prev => {
            const data = (prev as Font[]).find(f => f.name === name)!;
            return data.styles;
        })
        setSearch("");
    };

    const onExit = () => {
        setActiveFontName(null);
        setSearch("");
        setFonts(loadedFonts);
    };

    const onVariantClick = () => {
        console.log("variant clicked");
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
        <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
            <Navigator activeFontName={activeFontName} onExit={onExit} />
            <div className="flex p-2 flex-col flex-1 gap-2">
                <Search
                    search={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={onClear}
                    ref={searchRef}
                />
                <MainFontInterface
                    search={search}
                    activeFontName={activeFontName}
                    onFontItemClick={onFontItemClick}
                    onVariantClick={onVariantClick}
                    fonts={fonts}
                />
            </div>
        </div>
    );
};

export default App;
