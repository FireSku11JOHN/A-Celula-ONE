import { useRef } from "react"
import { useThreeScene } from "../hooks/useThreeScene"

export const HeroSection = () => {
    const containerRef = useRef(null); 
    
    useThreeScene(containerRef);

    return (
        <div ref={containerRef} className="flex w-full h-screen overflow-hidden">
            <div className="absolute inset-0 left-1/2 -translate-x-1/2 flex w-full items-center justify-around max-sm:flex-col max-sm:justify-center">
                <div className="text-center">
                    <img className="w-105 max-md:w-65" src="src/assets/logo_one.svg" alt="Logo"/>
                </div>
                <div className="mt-8 max-w-120 w-[60%] px-6 text-center text-white max-md:w-full">
                    <p className="text-lg leading-relaxed text-left max-md:text-[16px] max-md:text-center">
                        Cada passo em meio à imensidão nos lembra que juntos somos mais fortes — porque é na união que encontramos força, fé e propósito. Onde o calor desafia, a presença de Deus nos renova e nos conduz, transformando o deserto em caminho de crescimento e comunhão.
                    </p>
                </div>
            </div>
        </div>
    )
}