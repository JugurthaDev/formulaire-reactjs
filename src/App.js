// App.js
import React, { useState, useEffect } from 'react';
import Inscription from './Inscription.js';
import Loader from './Loader.js'; // Importez le composant Loader
import './App.css';

function App() {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Simuler le chargement des données
        const timer = setTimeout(() => {
            setFadeOut(true); // Déclencher le fade-out
            setTimeout(() => setLoading(false), 500); // Attendre la fin de l'animation avant de changer le contenu
        }, 1000);

        return () => clearTimeout(timer); // Nettoyer le timer à la désactivation du composant
    }, []);

    return (
        <div className="App">
            {loading ? (
                <div className={`loader ${fadeOut ? 'fade-out' : ''}`}>
                    <Loader />
                </div>
            ) : (
                <header className="App-header">
                    <Inscription />
                </header>
            )}
        </div>
    );
}

export default App;
