import React, { useEffect, useId, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronRight } from "react-feather";

type Font = {
    name: string;
    thumbnail?: string;
    styles: FontStyle[][];
};

type FontStyle = {
    name: string;
    thumbnail?: string;
    weight?: number;
    width?: number;
    italics?: boolean;
};

const NUM_FONTS_PER_PAGE = 6;

function _loadFontStyles(name: string): FontStyle[] {
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

function loadFontStyles(name: string): FontStyle[][] {
    const styles = _loadFontStyles(name);
    const pages = [];
    for (let i = 0; i < styles.length; i += NUM_FONTS_PER_PAGE) {
        pages.push(styles.slice(i, i + NUM_FONTS_PER_PAGE));
    }
    return pages;
}

function _loadFonts(): Font[] {
    return [
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

function loadFonts(): Font[][] {
    const loaded = _loadFonts();
    const pages: Font[][] = [];
    for (let i = 0; i < loaded.length; i += NUM_FONTS_PER_PAGE) {
        pages.push(loaded.slice(i, i + NUM_FONTS_PER_PAGE));
    }

    return pages;
}

type FontViewerProps = {
    fonts: Font[] | FontStyle[];
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const FontViewer = ({ fonts, onClick }: FontViewerProps) => {
    return (
        <div
            className="flex-1 grid gap-2 max-sm:justify-center
      grid-cols-[repeat(auto-fit,200px)] auto-rows-[200px]"
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

type FontVariantViewerProps = {
    fonts: FontStyle[];
    onVariantClick: React.MouseEventHandler<HTMLButtonElement>;
};
const FontVariantContainer = ({
    fonts,
    onVariantClick,
}: FontVariantViewerProps) => {
    return (
        <div className="flex-1 flex flex-col gap-1">
            <FontViewer fonts={fonts} onClick={onVariantClick} />
        </div>
    );
};

type BaseFontContainer = {
    fonts: Font[] | FontStyle[];
    onFontItemClick: (name: string) => void;
};
const BaseFontContainer = ({ fonts, onFontItemClick }: BaseFontContainer) => {
    return (
        <FontViewer
            fonts={fonts}
            onClick={(e) => onFontItemClick(e.currentTarget.textContent)}
        />
    );
};

type MainFontInterfaceProps = {
    fonts: Font[] | FontStyle[] | null;
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
                    <FontVariantContainer
                        fonts={fonts}
                        onVariantClick={onVariantClick}
                    />
                ) : (
                    <BaseFontContainer
                        fonts={fonts}
                        onFontItemClick={onFontItemClick}
                    />
                )
            ) : (
                <p className="p-2 text-2xl">No fonts to display</p>
            )}
        </>
    );
};

type ArrowButtonProps = {
    side: "Left" | "Right";
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const ArrowButton = ({ side, onClick }: ArrowButtonProps) => {
    return (
        <button
            className="flex p-2 justify-center items-center rounded-full cursor-pointer 
            hover:bg-zinc-800 bg-zinc-900"
            onClick={onClick}
        >
            {side === "Left" ? (
                <ArrowLeft className="size-5" />
            ) : (
                <ArrowRight className="size-5" />
            )}
        </button>
    );
};

type NavigatorProps = {
  activeFontName : string | null,
  onExit : React.MouseEventHandler<HTMLButtonElement>
}
const Navigator = ({activeFontName, onExit} : NavigatorProps) => {
  return (
    <div className="bg-zinc-800 flex p-0.5 items-center">
      <div className="flex items-center gap-0.5">
        <button onClick={onExit} className={`${activeFontName && "hover:bg-zinc-700/70 cursor-pointer"} rounded-md p-1 px-1.5`}>Fonts</button>
        {activeFontName &&
        <>
          <span className="cursor-default text-[oklch(42%_0_0)]"><ChevronRight className="size-[23px]"/></span>
          <span className="ml-0.5 cursor-default text-[oklch(60%_0_0)]">{activeFontName}</span>
        </>}
      </div>
    </div>
  )
}

const App = () => {
    const [fonts, setFonts] = useState<Font[][] | null>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [search, setSearch] = useState("");
    const [activeFontName, setActiveFontName] = useState<string | null>(null);

    const id = useId();

    useEffect(() => {
        const load = () => {
            const fontData = loadFonts();
            setFonts(fontData);
        };

        load();
    }, []);

    const onGoBack = () => {
        if (!fonts) return;
        setPageIndex((prev) => {
            if (activeFontName) {
                const font = fonts[prev].find(font => font.name === activeFontName);
                if (!font) {
                    return 0;
                }

                return (prev > 0 ? prev - 1 : font.styles.length - 1)
            }

            return (prev > 0 ? prev - 1 : fonts.length - 1);
        });
    };

    const onGoForward = () => {
        if (!fonts) return;
        setPageIndex((prev) => {
            if (activeFontName) {
                const font = fonts[prev].find(font => font.name === activeFontName);
                if (!font) {
                    return 0;
                }

                return (prev < font.styles.length - 1 ? prev + 1 : 0)
            }

            return (prev < fonts.length - 1 ? prev + 1 : 0);
        });
    };

    const onFontItemClick = (name: string) => {
        console.log(name);
        setActiveFontName(name);
        setSearch("");
    };

    const onExit = () => {
        setActiveFontName(null);
        setSearch("");
    };

    const onVariantClick = () => {
        console.log("variant clicked");
    };

    const getFonts = () => {
        if (!fonts) {
            return null;
        }

        if (activeFontName) {
            const font = fonts[pageIndex].find(
                (font) => font.name === activeFontName,
            );
            if (!font) {
                return null;
            }

            return font.styles[pageIndex];
        }

        return fonts[pageIndex];
    };

    return (
        <div className="h-screen flex flex-col bg-zinc-950 text-white">
          <Navigator activeFontName={activeFontName} onExit={onExit}/>
          <div className="flex p-2 flex-col flex-1 gap-2">
              <input
                  placeholder="Enter Font Name"
                  className="p-2
                  [&::-webkit-search-cancel-button]:appearance-none
                  rounded-md ring-2 ring-zinc-800 bg-zinc-900 outline-none focus:ring-zinc-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  name={id}
                  id={id}
              />
              <MainFontInterface
                  search={search}
                  activeFontName={activeFontName}
                  onFontItemClick={onFontItemClick}
                  onVariantClick={onVariantClick}
                  fonts={getFonts()}
              />
          </div>
          {fonts?.[pageIndex] && (
              <div className="flex justify-center items-center gap-4 p-2">
                  <ArrowButton onClick={onGoBack} side="Left" />
                  <ArrowButton onClick={onGoForward} side="Right" />
              </div>
          )}
        </div>
    );
};

export default App;
