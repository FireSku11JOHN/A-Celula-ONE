import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText)

let split = SplitText.create(".head-text", { type: "words, chars" });
document.addEventListener("DOMContentLoaded", () => {


    gsap.from(split.chars, {
        duration: 1,
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: 180,
        transformOrigin: "0% 50% -50",
        ease: "back",
        stagger: 0.05,
    });

    gsap.from(".logo", {
        xPercent: -100,  // Começa 100% da sua própria largura para a esquerda (fora da tela)
        autoAlpha: 0,    // Começa invisível (combina opacity:0 e visibility:hidden)

        duration: 1.5,   // A animação durará 1.5 segundos
        ease: "power3.out" // Efeito de desaceleração suave no final
    });

    gsap.from(".paragraph", {
        autoAlpha: 0,
        y: 20,           // Começa 20px para baixo
        duration: 1,
        ease: "power2.out",
        delay: 0.75      // Começa 0.75s depois que a página carrega
    });
});
