import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
//? functions decode / encode
export const encryptAES = (string: string, masterpass: string) => {
    if (!masterpass) {
        document.location.replace("/setMasterPass");
    } else if (string) {
        let encryptedObj = AES.encrypt(string, masterpass);
        return encryptedObj.toString();
    } else {
        return "";
    };
};

export const decryptAES = (encrypted: string, masterpass: string) => {
    if (!masterpass) {
        document.location.replace("/setMasterPass");
    } else if (encrypted) {
        let decryptedObj = AES.decrypt(encrypted, masterpass);
        return decryptedObj.toString(Utf8);
    } else {
        return "";
    };
};