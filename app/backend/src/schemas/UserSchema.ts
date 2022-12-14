import Joi from 'joi';

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().empty().messages({
    'string.empty': '400|email is required',
    'string.base': '400|email must be a string',
    'string.email': '400|the string is not a valid e-mail.',
  }),

  password: Joi.string().min(6).required().empty().messages({
    'string.min': '400|password must be at least 6 characters long.',
    'string.empty': '400|password is required',
    'string.base': '400|password must be a string',
  }),
});

export const userRegisterSchema = Joi.object({
  name: Joi.string().min(12).required().empty().messages({
    'string.empty': '400|name is required',
    'string.min': '400|name must be at least 6 characters long',
    'string.base': '400|name must be a string',
  }),
  email: Joi.string().email().required().empty().messages({
    'string.empty': '400|email is required',
    'string.base': '400|email must be a string',
    'string.email': '400|the string is not a valid e-mail.',
  }),
  password: Joi.string().min(6).required().empty().messages({
    'string.min': '400|password must be at least 6 characters long.',
    'string.empty': '400|password is required',
    'string.base': '400|password must be a string',
  }),
});
