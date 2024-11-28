import { FunctionComponent, useState } from "react";

const HomePage: FunctionComponent = () => {
    const [totalMoney, setTotalMoney] = useState(0); // Simule le montant total d'argent

    // Détermine le message en fonction du montant total
    const getWealthMessage = () => {
        if (totalMoney > 10000000) return "The world is yours";
        if (totalMoney > 1000000) return "Vous êtes sacrément riche";
        if (totalMoney > 100000) return "Vous êtes très riche";
        if (totalMoney > 10000) return "Vous êtes un peu riche";
        return "Vous êtes fauché";
    };

    return (
        <div className="home-page" style={{ textAlign: "center", margin: "2rem" }}>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Richomètre</h1>

            {/* Montant total d'argent */}
            <div style={{ margin: "2rem 0" }}>
                <h2>Montant total :</h2>
                <input
                    type="number"
                    value={totalMoney}
                    onChange={(e) => setTotalMoney(Number(e.target.value))}
                    style={{ fontSize: "1.5rem", padding: "0.5rem", width: "10rem", textAlign: "center" }}
                />
                <p style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "1rem" }}>
                    {totalMoney.toLocaleString()} €
                </p>
            </div>

            {/* Message basé sur le montant */}
            <div>
                <h2 style={{ fontSize: "2rem", color: "white" }}>{getWealthMessage()}</h2>
            </div>
        </div>
    );
};

export default HomePage;
