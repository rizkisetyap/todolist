const joi = require('@hapi/joi');

const registerValidation = data => {
  const schema = joi.object({
    nama: joi.string().required().min(5).max(255),
    email: joi.string().required().min(5).max(255).email(),
    password: joi.string().required().min(5).max(1024)
  })

  return schema.validate(data)
}
const loginValidation = data => {
  const schema = joi.object({
    email: joi.string().required().min(5).max(255).email(),
    password: joi.string().required().min(5).max(1024)
  })

  return schema.validate(data)
}

const todo_validation = data => {
  const schema = joi.object({
    name: joi.string().required().min(3).max(512),
    due_date: joi.date().required()

  })
  return schema.validate(data);
}

module.exports.todoValidation = todo_validation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;