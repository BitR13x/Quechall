import React, { useMemo, useState } from "react";

export const MasterPasswordContext = React.createContext();

//? useContext
//? User here would be good
//? https://www.youtube.com/watch?v=lhMKvyLRWo0
const Store = ({children}) => {
    const [masterpass, setMasterPass] = useState("");
    const providedValue = useMemo(() => ({masterpass, setMasterPass}), [masterpass, setMasterPass])
    return (
        <MasterPasswordContext.Provider value={providedValue}> 
            {children}
        </MasterPasswordContext.Provider>
    );
};

export default Store;