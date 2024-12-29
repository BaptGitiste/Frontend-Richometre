import { FunctionComponent } from "react";

const MesActionsPage: FunctionComponent = () => {
    // Tableau fictif d'actions
    const mesActions = [
        {
            nom: "Apple",
            quantite: 10,
            prixMoyenAchat: 135, // prix moyen d'achat fictif
            coursDuJour: 142,    // cours du jour fictif
        },
        {
            nom: "Tesla",
            quantite: 5,
            prixMoyenAchat: 700,
            coursDuJour: 650,
        },
        {
            nom: "Microsoft",
            quantite: 8,
            prixMoyenAchat: 250,
            coursDuJour: 265,
        },
    ];

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Mes Actions</h1>

            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nom</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantité</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Prix moyen d'achat ($)</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cours du jour ($)</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>+/- value latente ($)</th>
                </tr>
                </thead>
                <tbody>
                {mesActions.map((action, index) => {
                    // Calcul de la différence unitaire
                    const differenceUnitaire = action.coursDuJour - action.prixMoyenAchat;
                    // Calcul de la plus/moins-value = différence unitaire * quantité
                    const plusMoinsValue = differenceUnitaire * action.quantite;

                    return (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{action.nom}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{action.quantite}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {action.prixMoyenAchat.toLocaleString()}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {action.coursDuJour.toLocaleString()}
                            </td>
                            <td
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    // Couleur verte si gain, rouge si perte
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

export default MesActionsPage;
