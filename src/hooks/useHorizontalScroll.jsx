import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHorizontalScroll(sectionRef, triggerRef) {
    useLayoutEffect(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;

        if (!section || !trigger) return;

        const scrollWidth = section.scrollWidth - window.innerWidth;

        let ctx = gsap.context(() => {
            gsap.to(section, {
                x: -scrollWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    pin: true,        // Prende a seção na tela
                    scrub: 1,         // Sincroniza o movimento com o scroll (suavidade 1s)
                    start: "top top", // Começa quando o topo da seção atinge o topo da tela
                    end: () => `+=${scrollWidth}`, // Dura o exato tamanho do conteúdo
                    invalidateOnRefresh: true, // Recalcula se a janela mudar de tamanho
                    // markers: true
                },
            });
        });

        return () => ctx.revert();
    }, [sectionRef, triggerRef]);
}