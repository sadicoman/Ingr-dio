/* eslint-disable react/no-unescaped-entities */
import "./Home.scss";
// import Menu__register__login from "../../templates/Menu__register__login/Menu__register__login";
import { Link } from "react-router-dom";
import MenuHome from "../../templates/Menu_Home/MenuHome";
import Loading from "./Loading/Loading";

const Home = () => {
    return (
        <>
            <Loading />
            <MenuHome />
            <main>
                <section className="section__hero">
                    <div className="section section__hero--contain">

                   
                    <h1 className="title">Ingredio</h1>
                    <div className="section__hero--middleLine"></div>
                    <Link to="/register" className="btn btn--primary pgrid-start4 pgrid-end7">
                        Commencez l'Aventure Culinaire
                    </Link> 
                    </div>
                </section>

                <section className="section section--features">
                    <div className="feature-item">
                        <h2 className="title title--niveau2">
                            Des Idées Recettes Inspirées
                        </h2>
                        <p>
                            Saisissez les ingrédients que vous avez, et laissez Ingrédio
                            vous proposer des recettes créatives et adaptées.
                        </p>
                    </div>
                    <div className="feature-item">
                        <h2 className="title title--niveau2">Garde-Manger Intelligent</h2>
                        <p>
                            Gérez vos stocks et découvrez des recettes pour utiliser au
                            mieux ce que vous possédez.
                        </p>
                    </div>
                    <div className="feature-item">
                        <h2 className="title title--niveau2">Cuisine Zéro Gaspillage</h2>
                        <p>
                            Utilisez tous vos ingrédients avant qu'ils n'expirent, pour
                            une cuisine responsable et durable.
                        </p>
                    </div>
                </section>

                <section className="section section--testimonials">
                    <h2 className="title title--niveau2">
                        Leurs Aventures Culinaires avec Ingrédio
                    </h2>
                    <blockquote>
                        "Ingrédio m'aide à innover en cuisine tous les jours avec ce que
                        j'ai sous la main." - Marc
                    </blockquote>
                    <blockquote>
                        "Finies les prises de tête pour les repas, Ingrédio est ma source
                        d'inspiration." - Sophie
                    </blockquote>
                </section>

                <section className="section section--call-to-action">
                    <h2 className="title title--niveau2">
                        Prêt à transformer votre expérience culinaire?
                    </h2>
                    <Link to="/register">Rejoignez Ingrédio aujourd'hui</Link>
                </section>
            </main>
        </>
    );
};

export default Home;
