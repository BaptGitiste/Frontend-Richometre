import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";


const HomePage: FunctionComponent = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/demo/123", { replace: false, state: { from: "HomePage" } });
    };

    return (
        <div className="home-page">
            <h1>This is HomePage</h1>
            <Link to="/demo/123" state={{ from: "HomePage" }}>Demo Page</Link>
            <button onClick={handleClick}>Demo Page</button>
        </div>
    )
};

export default HomePage;