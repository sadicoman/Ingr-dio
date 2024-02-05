import "./AlertPopup.scss";
import { useEffect, useState } from "react";

// Fonction pour obtenir l'icône en fonction du type
const getIcon = (type) => {
    switch (type) {
        case "success":
            return (
                <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 12l2 2 4-4"
                        stroke="#155724"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="9"
                        stroke="#155724"
                        strokeWidth="2"
                    />
                </svg>
            );
        case "error":
            return (
                <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="12" r="9" stroke="#721c24" strokeWidth="2" />
                    <path
                        d="M9 9l6 6M15 9l-6 6"
                        stroke="#721c24"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );
        // Ajoutez plus de cas selon les types requis
        default:
            return null; // ou une icône par défaut
    }
};

const AlertPopup = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            // Afficher la popup
            setIsVisible(true);

            // Masquer la popup après 3 secondes
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            // Nettoyage
            return () => clearTimeout(timer);
        }
    }, [message, type]);

    if (!isVisible) return null;

    return (
        <div className={`alert-popup ${type}`}>
            <div className="alert-popup__icon">{getIcon(type)}</div>
            <div className="alert-popup__title">{message}</div>
            <div className="alert-popup__close" onClick={onClose}>
                <svg
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="#000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
};

export default AlertPopup;
