/// <reference types="react-scripts" />
import { Link } from "react-router-dom";
import logo from '../../logo.svg';
import '../../scss/navbar.scss';

const NavbarComponent = () => {
    const toggleNav = () => {
        var nav = document.getElementById('nav');
        if (nav) (nav.classList.contains('active')) ? nav.classList.remove('active') : nav.classList.add('active');
    };
    return (
        <header className='App-header'>
            <div className='logo'>
                <a href="/"><img src={logo} className="headerIcon" alt="logo" /></a>
            </div>
            <div>
            <nav id="nav" className="togglebar">
                <button onClick={toggleNav} className="nav-icon" id="nav-icon">
                    <span className='navbarSpan'></span>
                </button>
                <ul>
                    <li className="link-nav"><Link to="/">home</Link></li>
                    <li className="link-nav"><Link to="#">about</Link></li>
                    <li className="link-nav"><Link to="#">contact</Link></li>
                    <li className="link-nav"><Link to="/question">question</Link></li>
                </ul>
            </nav>
            </div>
        </header>
    );
};

export default NavbarComponent