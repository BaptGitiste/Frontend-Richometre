import { FunctionComponent, useEffect, useState } from "react";

const MesActionsPage: FunctionComponent = () => {
    const [mesActions, setMesActions] = useState<any[]>([]); // Tableau des actions
    const [showForm, setShowForm] = useState(false); // Contrôle de l'affichage du formulaire
    const [formData, setFormData] = useState({ nom: "", quantite: 0, prix: 0 }); // Données du formulaire
    const [isLoading, setIsLoading] = useState(false); // Indicateur de chargement
    const [error, setError] = useState<string | null>(null); // Gestion des erreurs

    // Récupération des données depuis le backend
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch("/portefeuille?type=action");
                if (!response.ok) throw new Error("Erreur lors de la récupération des données.");
                const data = await response.json();
                setMesActions(data);
            } catch (err: any) {
                setError(err.message || "Une erreur est survenue.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Soumission du formulaire
    const handleSubmit = async () => {
        setError(null);
        try {
            const response = await fetch("/portefeuille", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, type: "action" }),
            });
            if (!response.ok) throw new Error("Erreur lors de l'ajout de la transaction.");
            const newTransaction = await response.json();
            setMesActions((prev) => [...prev, newTransaction]);
            setShowForm(false);
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de l'ajout.");
        }
    };

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Mes Actions</h1>
            {/* Bouton pour afficher le formulaire */}
            <button onClick={() => setShowForm((prev) => !prev)}>
                {showForm ? "Annuler" : "Ajouter/Acheter"}
            </button>

            {/* Affichage du formulaire */}
            {showForm && (
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div>
                        <label>Nom :</label>
                        <input
                            type="text"
                            placeholder="Nom"
                            value={formData.nom}
                            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Quantité :</label>
                        <input
                            type="number"
                            placeholder="Quantité"
                            value={formData.quantite}
                            onChange={(e) => setFormData({ ...formData, quantite: +e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Prix :</label>
                        <input
                            type="number"
                            placeholder="Prix"
                            value={formData.prix}
                            onChange={(e) => setFormData({ ...formData, prix: +e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit">Valider</button>
                </form>
            )}

            {/* Indicateur de chargement */}
            {isLoading && <p>Chargement des données...</p>}

            {/* Affichage des erreurs */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Tableau des actions */}
            {!isLoading && !error && mesActions.length > 0 && (
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Quantité</th>
                        <th>Prix moyen d'achat (€)</th>
                        <th>Cours du jour (€)</th>
                        <th>Valeur Totale (€)</th>
                        <th>+/- value latente (€)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mesActions.map((action) => (
                        <tr key={action.id}>
                            <td>{action.nom}</td>
                            <td>{action.quantite}</td>
                            <td>{action.prix}</td>
                            <td>{action.coursDuJour ?? "N/A"}</td>
                            <td>{(action.quantite * (action.coursDuJour || 0)).toFixed(2)}</td>
                            <td style={{ color: (action.coursDuJour - action.prix) >= 0 ? "green" : "red" }}>
                                {((action.coursDuJour - action.prix) * action.quantite).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Message si aucune action n'est disponible */}
            {!isLoading && !error && mesActions.length === 0 && (
                <p>Aucune action enregistrée pour le moment.</p>
            )}
        </div>
    );
};

export default MesActionsPage;
