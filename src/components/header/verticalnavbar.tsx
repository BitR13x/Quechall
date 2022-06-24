import "../../scss/verticalnavbar.scss";

const VerticalNavbar = () => {
    return (
        <div className="menu">
            <div className="label">Hover Me</div>
            <div className="spacer"></div>
            <div className="item"><span>Questions</span></div>
            <div className="item"><span>Policy Privacy</span></div>
        </div>
    );
};

export default VerticalNavbar;