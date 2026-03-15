import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function useAnimationHeaderTitle(titleRef) {
    useLayoutEffect(() => {
        if (!titleRef.current) return;

        let ctx = gsap.context(() => {
            // 1. Divide o texto em caracteres e palavras
            const split = new SplitText(titleRef.current, {
                type: "chars, words",
                charsClass: "inline-block" // Importante para transformações funcionarem bem
            });

            // 2. Animação de entrada
            gsap.from(split.chars, {
                duration: 0.8,
                y: 50,
                opacity: 0,
                rotateX: -90,
                stagger: 0.03,
                ease: "power4.out",
                // Evita que o texto fique "cortado" em alguns navegadores durante a animação
                force3D: true
            });

        }, titleRef); // Escopo limitado à ref do título

        return () => ctx.revert();
    }, [titleRef]);
}