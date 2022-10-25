import "../../scss/header/verticalnavbar.scss";
import { Link } from "react-router-dom";

const VerticalNavbar = () => {
    return (
        <div>
            <div className="menu">
                <div className="label">Hover Me</div>
                <div className="spacer"></div>
                <div className="item"><Link to="/Feedback"><span>Feedback</span></Link></div>
                <div className="item"><Link to="/PrivacyPolicy"><span>Policy Privacy</span></Link></div>
                <div className="item"><Link to="/about"><span>About</span></Link></div>
            </div>

            <div>
                <div className="support">
                    <div className="supportTitle">
                        <p>Support Us</p>
                    </div>
                    <a href="https://www.patreon.com/BitR13x" target={"_blank"} rel="noreferrer">
                        <div className="supportIcon">
                            <div>
                                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M512 194.8c0 101.3-82.4 183.8-183.8 183.8-101.7 0-184.4-82.4-184.4-183.8 0-101.6 82.7-184.3 184.4-184.3C429.6 10.5 512 93.2 512 194.8zM0 501.5h90v-491H0v491z" />
                                </svg>
                            </div>
                            <div className="supportCircle">
                                <svg fill="#121212" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z" />
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

        </div>
    );
};

export default VerticalNavbar;