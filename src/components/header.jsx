export const Header = () => {
    return (
        <header className="absolute left-6 right-6 flex items-center py-8 border-b border-white text-white max-mobile-sm:py-4 max-mobile-sm:left-3 max-mobile-sm:right-3 max-md:py-5">
            <img className="w-18 max-mobile-sm:w-15" src="src/assets/logo_one.svg" alt="Logo"/>
            <h1 className="absolute left-1/2 -translate-x-1/2 text-[18px] font-medium text-center max-mobile-sm:text-[12px] max-md:text-[14px]">
                MUITOS QUE PERMANECEM UM
            </h1>
        </header>
    )
}