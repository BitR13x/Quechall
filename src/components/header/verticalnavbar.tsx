import "../../scss/verticalnavbar.scss";
import { Link } from "react-router-dom";

const VerticalNavbar = () => {
    return (
        <div className="menu">
            <div className="label">Hover Me</div>
            <div className="spacer"></div>
            <div className="item"><Link to="/Questions"><span>Questions</span></Link></div>
            <div className="item"><Link to="/PrivacyPolicy"><span>Policy Privacy</span></Link></div>
            <div className="item"><Link to="/about"><span>About</span></Link></div>
        </div>
    );
};

export default VerticalNavbar;