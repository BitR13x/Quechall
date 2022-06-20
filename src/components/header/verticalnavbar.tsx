import "../../scss/verticalnavbar.scss";

const VerticalNavbar = () => {
    return (
        <div className="menu">
            <div className="label">Follow Me</div>
            <div className="spacer"></div>
            <div className="item"><span>Twitter</span></div>
            <div className="item"><span>Instagram</span></div>
            <div className="item"><span>Flickr</span></div>
            <div className="item"><span>Behance</span></div>
            <div className="item"><span>MixCloud</span></div>
        </div>
    );
};

export default VerticalNavbar;