import "./Home.scss";
// import Menu__register__login from "../../templates/Menu__register__login/Menu__register__login";
import { Link } from "react-router-dom";
import MenuHome from "../../templates/Menu_Home/MenuHome";

const Home = () => {
    return (
        <>
            <MenuHome />
            <main>
                <section className="section hero">
                    <h1 className="title">
                        Ingredio: Votre Assistant Culinaire Intelligent
                    </h1>
                    <p>
                        Transformez les ingrédients de votre garde-manger en délicieuses
                        recettes avec Ingrédio. Une solution innovante pour cuisiner
                        intelligemment et sans gaspillage.
                    </p>
                    <Link to="/register" className="btn-primary">
                        Commencez l'Aventure Culinaire
                    </Link>
                </section>

                <section className="section features">
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

                <section className="section testimonials">
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

                <section className="section call-to-action">
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
