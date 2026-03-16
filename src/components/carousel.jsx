import { useRef } from "react";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";

import img1 from "../assets/teste-one-1.jpg"
import img2 from "../assets/teste-one-2.jpg"

import icon_oracao from "../assets/icon-oracao.svg"

export const Carousel = () => {
    const triggerRef = useRef(null);
    const sectionRef = useRef(null);

    useHorizontalScroll(sectionRef, triggerRef);

    return (
        <div ref={triggerRef} className="overflow-hidden z-10">

            <div ref={sectionRef} className="flex w-fit h-screen">

                <div className="h-screen w-screen bg-primary bg-[url('/src/assets/fundo-dunas-branca.svg')] bg-cover bg-center bg-no-repeat flex items-center justify-evenly
                px-4 py-20 max-md:flex-col max-md:justify-between max-md:items-start max-md:gap-10 max-md:py-10">
                    <div>
                        <img className="w-[90%] max-w-[485px] height-auto rounded-2xl max-md:w-[40%]" src={img1} alt="" />
                    </div>
                    <div className="flex flex-col items-center bg-secondary p-10 rounded-2xl gap-4 max-w-[35%] max-md:max-w-[55%] max-md:self-end max-md:mr-4 max-md:px-6">
                        <img className="w-20 max-md:w-16" src={icon_oracao} alt="" />
                        <h3 className="text-[30px] font-bold text-marrom">Oração</h3>
                        <p className="text-center text-[20px]">Buscamos a presença de Deus em unidade, fortalecendo nossa fé e propósito.</p>
                    </div>
                </div>

                <div className="h-screen w-screen bg-primary bg-[url('/src/assets/fundo-dunas-branca.svg')] bg-cover bg-center bg-no-repeat flex items-center justify-evenly
                px-4 py-20">
                    <div>
                        <img className="w-[90%] max-w-[485px] height-auto rounded-2xl max-md:w-[40%]" src={img1} alt="" />
                    </div>
                    <div className="flex flex-col items-center bg-secondary p-10 rounded-2xl gap-4 max-w-[35%]">
                        <img className="w-20" src={icon_oracao} alt="" />
                        <h3 className="text-[30px] font-bold text-marrom">Oração</h3>
                        <p className="text-center text-[20px]">Buscamos a presença de Deus em unidade, fortalecendo nossa fé e propósito.</p>
                    </div>
                </div>
                <div className="h-screen w-screen bg-blue-500 flex items-center justify-center p-20">
                    <p className="text-2xl">Terceira TELA: Natus tenetur in quibusdam fuga...</p>
                </div>

            </div>
        </div>
    );
};