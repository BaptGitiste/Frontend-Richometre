// src/store/slices/portefeuille.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Définir un type pour l'investissement
type Investissement = {
    id: string;            // ID unique pour chaque investissement
    nom: string;           // Nom de la crypto ou de l'action (ex: Bitcoin, Apple)
    montant: number;       // Quantité achetée
    prixAchat: number;     // Prix d'achat par unité
    prixActuel: number;    // Prix actuel par unité
    type: 'crypto' | 'bourse'; // Type de l'investissement (crypto ou action)
};

interface PortefeuilleState {
    investissements: Investissement[];
}

const initialState: PortefeuilleState = {
    investissements: [],
};

// Création du slice pour gérer les investissements
const portefeuilleSlice = createSlice({
    name: 'portefeuille',
    initialState,
    reducers: {
        ajouterInvestissement: (state, action: PayloadAction<Investissement>) => {
            state.investissements.push(action.payload); // Ajoute un nouvel investissement
        },
    },
});

export const { ajouterInvestissement } = portefeuilleSlice.actions;
export default portefeuilleSlice.reducer;
