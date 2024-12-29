export interface TransactionDto {
    id?: number; // Optionnel pour une nouvelle transaction
    nom: string;
    quantite: number;
    prix: number;
    coursDuJour?: number; // Optionnel, calculé côté backend
    type: string; // Par exemple : "action" ou "crypto"
}
