import "./Home.scss";
import Menu__register__login from "../../templates/Menu__register__login/Menu__register__login";

const Home = () => {
    return (
        <>
            <header>
                <Menu__register__login />
            </header>
            <main>
                <section>
                    <h2>Bienvenue sur Ingrédio</h2>
                    <p>Description de l'application...</p>
                </section>
            </main>
        </>
    );
};

export default Home;
