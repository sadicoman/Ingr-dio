import "./LoaderChargement.scss"; // Assurez-vous d'avoir le fichier SCSS pour les styles

const LoaderChargement = () => {
    return (
        <div className="card__loader">
            <div className="loader">
                <p>Chargement</p>
                <div className="words">
                    <span className="word">des aliments</span>
                    <span className="word">des recettes</span>
                    <span className="word">du garde-manger</span>
                    <span className="word">du profils</span>
                </div>
            </div>
        </div>
    );
};

export default LoaderChargement;
