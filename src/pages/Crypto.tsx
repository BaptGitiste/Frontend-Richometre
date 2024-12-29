import { FunctionComponent } from "react";

const MesCryptosPage: FunctionComponent = () => {
    // Tableau fictif de cryptos
    const mesCryptos = [
        {
            nom: "Bitcoin",
            quantite: 2,
            prixMoyenAchat: 19000, // prix moyen d'achat fictif en €
            coursDuJour: 23000,    // cours du jour fictif en €
        },
        {
            nom: "Ethereum",
            quantite: 5,
            prixMoyenAchat: 1400,
            coursDuJour: 1800,
        },
        {
            nom: "BNB",
            quantite: 10,
            prixMoyenAchat: 270,
            coursDuJour: 310,
        },
    ];

    // Calcul du montant total de tous les encours (somme des valeurs totales)
    const montantTotalEncours = mesCryptos.reduce((accumulateur, crypto) => {
        return accumulateur + crypto.quantite * crypto.coursDuJour;
    }, 0);

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Mes Cryptos</h1>

            {/* Montant total d'encours (en plus gros et en gras) */}
            <div style={{ fontSize: "1.5em", fontWeight: "bold", marginBottom: "1rem" }}>
                Encours total : {montantTotalEncours.toLocaleString()} €
            </div>

            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nom</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantité</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Prix moyen d'achat (€)</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cours du jour (€)</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Valeur Totale (€)</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>+/- value latente (€)</th>
                </tr>
                </thead>
                <tbody>
                {mesCryptos.map((crypto, index) => {
                    // Calcul de la différence unitaire
                    const differenceUnitaire = crypto.coursDuJour - crypto.prixMoyenAchat;
                    // Calcul de la plus/moins-value latente
                    const plusMoinsValue = differenceUnitaire * crypto.quantite;
                    // Valeur totale actuelle
                    const valeurTotale = crypto.quantite * crypto.coursDuJour;

                    return (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{crypto.nom}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{crypto.quantite}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {crypto.prixMoyenAchat.toLocaleString()}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {crypto.coursDuJour.toLocaleString()}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {valeurTotale.toLocaleString()}
                            </td>
                            <td
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    color: plusMoinsValue >= 0 ? 'green' : 'red',
                                }}
                            >
                                {plusMoinsValue.toLocaleString()}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default MesCryptosPage;
