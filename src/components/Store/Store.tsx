import React, { useMemo, useState } from "react";
export const MasterPasswordContext = React.createContext({masterpass: "", setMasterPass: undefined});
export const StoreFetchContext = React.createContext({notes: [], setNotes: undefined, passwords: [], setPasswords: undefined});
export const ProfilePrefsContext = React.createContext({generatePasswdPrefs: {upperChars: true, lowerChars: true, numbers: true, symbols: true, pwdlen: 24, isUpdated: false},
                                                        setGeneratePasswdPrefs: undefined})
//? useContext
//? User here would be good
//? https://www.youtube.com/watch?v=lhMKvyLRWo0
const Store = ({children}) => {
    const [masterpass, setMasterPass] = useState("");
    const [notes, setNotes] = useState([]);
    const [passwords, setPasswords] = useState([]);
    const [generatePasswdPrefs, setGeneratePasswdPrefs] = useState({
        upperChars: true, lowerChars: true, numbers: true, symbols: true, pwdlen: 24, isUpdated: false
    });
    const providedValue = useMemo(() => ({masterpass, setMasterPass}), 
                                         [masterpass, setMasterPass])
    const StoreFetchValue = useMemo(() => ({notes, setNotes, passwords, setPasswords}),
                                           [notes, setNotes, passwords, setPasswords])
    const ProfilePrefsValue = useMemo(() => ({generatePasswdPrefs, setGeneratePasswdPrefs}),
                                             [generatePasswdPrefs, setGeneratePasswdPrefs])
    return (
        <MasterPasswordContext.Provider value={providedValue}>
            <StoreFetchContext.Provider value={StoreFetchValue}> 
                <ProfilePrefsContext.Provider value={ProfilePrefsValue}>
                    {children}
                </ProfilePrefsContext.Provider>
            </StoreFetchContext.Provider>
        </MasterPasswordContext.Provider>
    );
};

export default Store;