import NavbarComponent from "../components/header/navbar";
import CirclesAnimation from "../components/animation/circles";

const Dashboard = () => {
    return (
        <div className="App">
            <NavbarComponent/>
            <div style={{ textAlign: "center" }}>
                <header>
                    <h1>Dashboard</h1>
                </header>
                <main style={{ padding: "1rem 0" }}>
                    Hello This is Dashboard
                </main>
            </div>
            <CirclesAnimation/>
        </div>
    );
};


export default Dashboard;