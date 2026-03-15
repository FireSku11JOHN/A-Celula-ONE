import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function useAnimationHeaderTitle(titleRef) {
    useLayoutEffect(() => {
        if (!titleRef.current) return;

        let ctx = gsap.context(() => {
            const split = new SplitText(titleRef.current, {
                type: "chars, words",
                charsClass: "inline-block"
            });

            gsap.from(split.chars, {
                duration: 0.8,
                y: -50,
                opacity: 0,
                rotateX: -90,
                stagger: 0.03,
                ease: "power4.out",
                force3D: true
            });

        }, titleRef);
        return () => ctx.revert();
    }, [titleRef]);
}