import DialogMasterPass from "../components/DialogMasterPass";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MasterPasswordContext } from "../components/Store/Store";

const SetMasterPass = () => {
    const { masterpass, setMasterPass } = useContext(MasterPasswordContext);
    let navigation = useNavigate();
    if (masterpass) navigation("/dashboard");
    const handleCloseMasterPass = (event?: React.SyntheticEvent | Event, reason?: string) => {
        return;
    };
    const redirectToDashboardWithState = (masterpass: string) => {
        //? replace state and redirect to dashboard
        setMasterPass(masterpass);
        navigation("/dashboard");
    };
    return (
        <div className="App">
            <DialogMasterPass open={true} handleClose={handleCloseMasterPass} setMasterPass={redirectToDashboardWithState} />
        </div>
    );
};

export default SetMasterPass;