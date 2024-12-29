import baseApi from "./base.api";
import { TransactionDto } from "../../models/portefeuille.model"; // Modèle des transactions

export const portefeuilleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Endpoint pour ajouter une transaction
        addTransaction: builder.mutation<TransactionDto, TransactionDto>({
            query: (transaction) => ({
                method: "POST",
                url: "/portefeuille",
                body: transaction
            })
        }),
        // Endpoint pour récupérer les transactions par type
        getTransactions: builder.query<TransactionDto[], string>({
            query: (type) => `/portefeuille?type=${type}`
        })
    }),
    overrideExisting: false
});

// Export des hooks générés automatiquement
export const {
    useAddTransactionMutation,
    useGetTransactionsQuery
} = portefeuilleApi;
