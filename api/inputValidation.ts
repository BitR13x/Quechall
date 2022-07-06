import Joi from "joi";

interface inputObject {
    username?: string;
    password?: string;
    newPassword?: string;
    birthYear?: number;
    email?: string;
    defaultString?: string;
};


export const inputValidate = ( inputObject: inputObject ) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30),
    
        password: Joi.string()
            .min(6)
            .max(60)
            .pattern(new RegExp('^[a-zA-Z0-9(.,#?!@&*$:\-§~^)]{0,}$'))
            .trim(),
    
        newPassword: Joi.string()
            .min(6)
            .max(60)
            .pattern(new RegExp('^[a-zA-Z0-9(.,#?!@&*$:\-§~^)]{0,}$'))
            .trim(),
        
        birthYear: Joi.number()
            .integer()
            .min(1900)
            .max(2013),
    
        email: Joi.string()
            .email({ minDomainSegments: 2 }),

        defaultString: Joi.string()
    });
    
    const { error, value } = schema.validate( inputObject );
    console.log(value)
    if (error) {
        return [ error.message, value ]
    } else {
        return [ "", value ]
    }
    
}