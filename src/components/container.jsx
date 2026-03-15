import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Container = ({ children }) => {

    const el = useRef(null);

    useEffect(() => {
        if (el.current) {
            const trigger = ScrollTrigger.create({
                trigger: el.current,      // Use el.current
                pin: true,
                pinSpacing: false,
                start: "top top",
                end: "bottom top",
                // markers: true
            });

            // Função de limpeza: será chamada quando o componente for desmontado
            return () => {
                trigger.kill();
            };
        }
    }, []);
    return (
        <div ref={el} className="h-full relative z-1">
            {children}
        </div>
    )
}