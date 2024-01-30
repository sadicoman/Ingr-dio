/* eslint-disable react/no-unknown-property */
import "./SectionCardVideo.scss";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import IconeRecettes from "../../../templates/Menu/icone/iconeRecettes";
import IconeGardeManger from "../../../templates/Menu/icone/iconeGardeManger";
import IconeAliments from "../../../templates/Menu/icone/iconeAliments";

gsap.registerPlugin(ScrollTrigger);

const SectionCardVideo = () => {
    useEffect(() => {
        if (window.matchMedia("(min-width: 768px)").matches) {
            // const video = document.querySelector("#hero-video video");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".c-video-section",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                    // markers: true,
                },
            });

            tl.fromTo(".c-video-grid", { gap: 0 }, { gap: "0.875em", duration: 0.1 }, 0.2)
                .fromTo(
                    "#hero-video",
                    { opacity: 1, display: "flex" },
                    {
                        opacity: 0,
                        display: "none",
                        duration: 0.1,
                        // onComplete: () => video.pause(),
                    },
                    0.2,
                )
                .fromTo(
                    ".c-card_backface",
                    { borderRadius: 0 },
                    { borderRadius: "1.5em", duration: 0.1 },
                    0.2,
                )
                .fromTo(
                    ".c-video-grid",
                    { borderRadius: "1.5em", overflow: "hidden" },
                    { borderRadius: "0", overflow: "visible", duration: 0.3 },
                    ">",
                )
                .to(
                    ".c-card_frontface",
                    { rotateY: "0deg", stagger: { amount: 0.1, from: "edges" } },
                    ">",
                )
                .to(
                    ".c-card_backface",
                    { rotateY: "-180deg", stagger: { amount: 0.1, from: "edges" } },
                    "<",
                );
            // .to(".c-video-card:nth-child(1)", {
            //     x: "5em",
            //     y: "10em",
            //     rotateY: "20deg",
            //     rotateX: "5deg",
            //     rotateZ: "-20deg",
            // })
            // .to(
            //     ".c-video-card:nth-child(2)",
            //     {
            //         zIndex: 10,
            //         x: "5em",
            //         y: "-10em",
            //         rotateY: "-15deg",
            //         rotateX: "-3deg",
            //         rotateZ: "10deg",
            //     },
            //     "<",
            // )
            // .to(
            //     ".c-video-card:nth-child(3)",
            //     {
            //         x: "-3em",
            //         y: "5em",
            //         rotateY: "10deg",
            //         rotateX: "-3deg",
            //         rotateZ: "15deg",
            //     },
            //     "<",
            // );
            // .fromTo("[card-light]", { opacity: 0 }, { opacity: 0.2, duration: 1 }, 0);
        }
    }, []);

    return (
        <section className="c-video-section">
            <div className="c-video-section-wrapper">
                <div className="c-container">
                    <div className="c-video-grid">
                        {/* Carte vidéo 1 */}
                        <div
                            id="w-node-_4a8573cb-a422-a2e8-b68f-72c183c849e5-b7dae8c8"
                            className="c-video-card"
                        >
                            <div className="c-card_frontface cc-1">
                                <IconeRecettes className="icone" />
                                <div>
                                    <h2 className="title title--niveau4">
                                        Des Recettes Inspirées
                                    </h2>
                                    <p>
                                        Saisissez les ingrédients que vous avez, et
                                        laissez Ingrédio vous proposer des recettes
                                        créatives et adaptées.
                                    </p>
                                </div>
                            </div>
                            <div className="c-card_backface cc-1"></div>
                        </div>
                        {/* Carte vidéo 2 */}
                        <div
                            id="w-node-_4a8573cb-a422-a2e8-b68f-72c183c849e5-b7dae8c8"
                            className="c-video-card"
                        >
                            <div className="c-card_frontface cc-2">
                                <IconeGardeManger className="icone" />
                                <div>
                                    <h2 className="title title--niveau4">
                                        Garde-Manger Intelligent
                                    </h2>
                                    <p>
                                        Gérez vos stocks et découvrez des recettes pour
                                        utiliser au mieux ce que vous possédez.
                                    </p>
                                </div>
                            </div>
                            <div className="c-card_backface cc-2"></div>
                        </div>
                        {/* Carte vidéo 3 */}
                        <div
                            id="w-node-_4a8573cb-a422-a2e8-b68f-72c183c849e5-b7dae8c8"
                            className="c-video-card"
                        >
                            <div className="c-card_frontface cc-3">
                                <IconeAliments className="icone" />
                                <div>
                                    <h2 className="title title--niveau4">
                                        Cuisine Zéro Gaspillage
                                    </h2>
                                    <p>
                                        Utilisez tous vos ingrédients avant qu'ils
                                        n'expirent, pour une cuisine responsable et
                                        durable.
                                    </p>
                                </div>
                            </div>
                            <div className="c-card_backface cc-3"></div>
                        </div>
                        <div id="hero-video" className="c-video-wrapper">
                            <img
                                src="src/assets/images/app_deco_cover.jpg"
                                loading="lazy"
                                // sizes="(max-width: 479px) 93vw, (max-width: 767px) 96vw, 94vw"
                                alt=""
                                id="video-poster"
                                className="c-poster"
                            ></img>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionCardVideo;
