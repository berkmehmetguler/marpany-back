import Joi from "joi";

export const userValidation = Joi.object({
    phone: Joi.number().required(),
    email_address: Joi.string().email().required(),
    username: Joi.string().required(),  
    account_type: Joi.string().required(),
    password: Joi.string().min(6).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),

});
