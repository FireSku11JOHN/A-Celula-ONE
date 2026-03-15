import { useLayoutEffect } from "react";
import { gsap } from "gsap";

export function useAnimationHeroSection(logoRef, paragraphRef) {
    useLayoutEffect(() => {
        // Verificação de segurança: só inicia se os elementos existirem
        if (!logoRef.current || !paragraphRef.current) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Animação do Logo
            tl.from(logoRef.current, {
                xPercent: -100,
                autoAlpha: 0,
                duration: 1.5,
                ease: "power3.out",
            })
                // Animação do Parágrafo (começa 0.5s antes do logo terminar)
                .from(paragraphRef.current, {
                    autoAlpha: 0,
                    y: 20,
                    duration: 1,
                    ease: "power2.out",
                }, "-=0.5");

        });

        // Limpa as animações se o componente for desmontado
        return () => ctx.revert();
    }, [logoRef, paragraphRef]);
}