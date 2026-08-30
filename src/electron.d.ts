import fontList from "font-list";

type PromisedFontList = ReturnType<typeof fontList.getFonts2>;
type FontList = Awaited<PromisedFontList>

export interface IElectronAPI {
    loadFonts: () => Promise<PromisedFontList>
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}