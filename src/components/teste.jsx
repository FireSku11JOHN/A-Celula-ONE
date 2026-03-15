import { useRef } from "react";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";

export const Carousel = () => {
    const triggerRef = useRef(null);
    const sectionRef = useRef(null);

    useHorizontalScroll(sectionRef, triggerRef);

    return (
        <div ref={triggerRef} className="overflow-hidden z-10">

            <div ref={sectionRef} className="flex w-fit h-screen">

                <div className="h-screen w-screen bg-secondary flex items-center justify-center p-20">
                    <p className="text-2xl">PRIMEIRA TELA: Lorem ipsum dolor sit amet...</p>
                </div>

                <div className="h-screen w-screen bg-green-500 flex items-center justify-center p-20">
                    <p className="text-2xl">SEGUNDA TELA: Natus tenetur in quibusdam fuga...</p>
                </div>
                <div className="h-screen w-screen bg-blue-500 flex items-center justify-center p-20">
                    <p className="text-2xl">Terceira TELA: Natus tenetur in quibusdam fuga...</p>
                </div>

            </div>
        </div>
    );
};