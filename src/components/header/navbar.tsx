/// <reference types="react-scripts" />
import { Link } from "react-router-dom";
import logo from '../../logo.png';
import '../../scss/header/navbar.scss';

const NavbarComponent = ({ login }) => {
    const toggleNav = () => {
        var nav = document.getElementById('nav');
        if (nav) (nav.classList.contains('active')) ? nav.classList.remove('active') : nav.classList.add('active');
    };
    return (
        <header className='App-header'>
            <div className='logo'>
                {login ? <Link to="/dashboard"><img src={logo} className="headerIcon" alt="logo" /></Link> :
                    <Link to="/"><img src={logo} className="headerIcon" alt="logo" /></Link>}
            </div>
            <div>
                <nav id="nav" className="togglebar">
                    <button onClick={toggleNav} className="nav-icon" id="nav-icon">
                        <span className='navbarSpan'></span>
                    </button>
                    {login ?
                        <ul>
                            <li className="link-nav"><Link to="/">home</Link></li>
                            <li className="link-nav"><Link to="/dashboard">dashboard</Link></li>
                            <li className="link-nav"><Link to="/profile">Profile</Link></li>
                            <li className="link-nav"><Link to="/logout">Log out</Link></li>
                        </ul>
                        :
                        <ul>
                            <li className="link-nav"><Link to="/">home</Link></li>
                            <li className="link-nav"><Link to="/login">log in</Link></li>
                            <li className="link-nav"><Link to="/register">sign up</Link></li>
                        </ul>}
                </nav>
            </div>
        </header>
    );
};

export default NavbarComponent