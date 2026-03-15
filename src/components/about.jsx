import about_rectangle_R from "../assets/about_rectangle_R.svg";
import about_rectangle_L from "../assets/about_rectangle_L.svg";

export const About = () => {
    return (
        <div className="relative flex z-10 bg-secondary py-20 rounded-t-2xl text-center overflow-hidden">
            <img
                src={about_rectangle_R}
                alt=""
                className="absolute left-0 top-14 z-0"
            />
            <div className="relative z-10 px-4 py-30 max-w-3xl mx-auto ">
                <h2 className="AROneSans-H2  text-white mb-6">Sobre nós</h2>
                <p className="Baloo2-AboutParagraph text-lg opacity-90 leading-relaxed">
                    Somos uma célula apaixonada por viver a unidade em Cristo. Acreditamos que juntos somos mais fortes, e que a verdadeira transformação acontece quando caminhamos lado a lado, compartilhando a jornada de fé.
                </p>
            </div>
            <img
                src={about_rectangle_L}
                alt=""
                className="absolute right-0 bottom-14 z-0"
            />

        </div>
    )
}