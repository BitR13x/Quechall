import DialogMasterPass from "../components/DialogMasterPass";
import { useNavigate, useLocation } from "react-router-dom";

const SetMasterPass = () => {
    let navigation = useNavigate();
    let RouterLocation = useLocation()
    if (RouterLocation.state ) {
        if ((RouterLocation.state as { masterpass: string }).masterpass) {
            navigation("/dashboard");
        };
    };
    const handleCloseMasterPass = (event?: React.SyntheticEvent | Event, reason?: string) => {
        return;
    };
    const redirectToDashboardWithState = (masterpass: string) => {
        //? replace state and redirect to dashboard
        navigation("/dashboard", {state: { masterpass: masterpass }});
    };
    return (
        <div className="App">
            <DialogMasterPass open={true} handleClose={handleCloseMasterPass} setMasterPass={redirectToDashboardWithState} />
        </div>
    );
};

export default SetMasterPass;