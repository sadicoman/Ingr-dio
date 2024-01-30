/* eslint-disable react/no-unescaped-entities */
import "./Home.scss";
// import Menu__register__login from "../../templates/Menu__register__login/Menu__register__login";
import { Link } from "react-router-dom";
import MenuHome from "../../templates/Menu_Home/MenuHome";
import Loading from "./Loading/Loading";
import Commentaire from "./Commentaire/Commentaire";
import SectionCardVideo from "./SectionCardVideo/SectionCardVideo";

const Home = () => {
    const cardData = [
        {
            dateTime: "Il y a 2 jours",
            description:
                "Ingrédio m'aide à innover en cuisine tous les jours avec ce que j'ai sous la main.",
            author: "Marc Porphyre",
            stars: 4,
        },
        {
            dateTime: "Il y a 1 jours",
            description:
                "Finies les prises de tête pour les repas, Ingrédio est ma source d'inspiration.",
            author: "Sophie Laurent",
            stars: 5,
        },
        // Ajoutez d'autres données de carte ici
    ];

    return (
        <>
            <Loading />
            <MenuHome />
            <main>
                <section className="section__hero">
                    <div className="section section__hero--contain">
                        <h1 className="title">Ingredio</h1>
                        <div className="section__hero--middleLine"></div>
                        <Link
                            to="/register"
                            className="btn btn--primary tgrid-start2 tgrid-end4 pgrid-start4 pgrid-end7"
                        >
                            Commencez l'Aventure Culinaire
                        </Link>
                    </div>
                </section>
                <div className="section">
                    <SectionCardVideo />
                </div>

                <section className="section section--bas section--testimonials">
                    <h2 className="title title--niveau2">
                        Leurs Aventures Culinaires avec Ingrédio
                    </h2>
                    <blockquote className="commentaire__container">
                        {cardData.map((data, index) => (
                            <Commentaire
                                key={index}
                                dateTime={data.dateTime}
                                description={data.description}
                                author={data.author}
                                stars={data.stars}
                            />
                        ))}
                    </blockquote>
                </section>
                {/* 
                <section className="section section--call-to-action">

                    <Link to="/register">Rejoignez Ingrédio aujourd'hui</Link>
                </section> */}
            </main>
        </>
    );
};

export default Home;
