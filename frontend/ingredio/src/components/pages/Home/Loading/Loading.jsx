import "./Loading.scss";
import { useEffect } from "react";
import { gsap } from "gsap";

const Loading = () => {
    useEffect(() => {
        const TLLOAD = gsap.timeline({
            defaults: {
                ease: "power2",
            },
        });

        TLLOAD.to(".images-container", { height: 400, duration: 1.3, delay: 0.4 })
            .to(".bloc-txt", { height: "auto", duration: 0.6 }, "-=0.8")
            .to(".bloc-txt h2", { y: 0 }, "-=0.6")
            .to(".f2", { y: 0, duration: 0.6 })
            .to(".flip-img1", { display: "none", duration: 0 })
            .to(".f2", { y: "-100%", onComplete: startVideo })
            .to(".load-container", { autoAlpha: 0, duration: 0.8, delay: 0.7 });

        function startVideo() {
            const video = document.querySelector("video");
            if (video) {
                video.play();
            }
        }
    }, []);

    return (
        <div className="load-container">
            <div className="anim-bloc">
                <div className="images-container">
                    <div className="img-flip flip-img2"></div>
                    <div className="img-flip flip-img1"></div>
                    <div className="flip f2"></div>
                </div>
                <div className="bloc-txt">
                    <h2>Ingredio.</h2>
                </div>
            </div>
        </div>
    );
};

export default Loading;
