import "./Home.scss";
import Menu__register__login from "../../templates/Menu__register__login/Menu__register__login";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<header>
				<Menu__register__login />
			</header>
			<main>
				<section className="hero">
					<h1>Ingrédio: Votre Assistant Culinaire Intelligent</h1>
					<p>
						Transformez les ingrédients de votre garde-manger en délicieuses recettes avec
						Ingrédio. Une solution innovante pour cuisiner intelligemment et sans
						gaspillage.
					</p>
					<Link to="/register" className="btn-primary">
						Commencez l'Aventure Culinaire
					</Link>
				</section>

				<section className="features">
					<div className="feature-item">
						<h3>Des Idées Recettes Inspirées</h3>
						<p>
							Saisissez les ingrédients que vous avez, et laissez Ingrédio vous proposer
							des recettes créatives et adaptées.
						</p>
					</div>
					<div className="feature-item">
						<h3>Garde-Manger Intelligent</h3>
						<p>
							Gérez vos stocks et découvrez des recettes pour utiliser au mieux ce que
							vous possédez.
						</p>
					</div>
					<div className="feature-item">
						<h3>Cuisine Zéro Gaspillage</h3>
						<p>
							Utilisez tous vos ingrédients avant qu'ils n'expirent, pour une cuisine
							responsable et durable.
						</p>
					</div>
				</section>

				<section className="testimonials">
					<h2>Leurs Aventures Culinaires avec Ingrédio</h2>
					<blockquote>
						"Ingrédio m'aide à innover en cuisine tous les jours avec ce que j'ai sous la
						main." - Marc
					</blockquote>
					<blockquote>
						"Finies les prises de tête pour les repas, Ingrédio est ma source
						d'inspiration." - Sophie
					</blockquote>
				</section>

				<section className="call-to-action">
					<h2>Prêt à transformer votre expérience culinaire?</h2>
					<Link to="/register">Rejoignez Ingrédio aujourd'hui</Link>
				</section>
			</main>
		</>
	);
};

export default Home;
