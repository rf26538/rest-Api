import Joi from "joi";
import { User } from '../../models';
import CoustomErrorHandler from "../../services/CoustomErrorHandler";

const registerController = {
  register(req, res, next) {
    const registerSchema = Joi.object({
      // using Library joi
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("/^[a-zA-Z0-9]{3-30}$/"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
       return next(error);
    }

    try {
      const exist = User.exists({ email: req.body.email });

      if (exist) {
        return next(CoustomErrorHandler.alreadyExist('This email is already taken'));
      }
    } catch (err) {
      return next(err);
    }

    res.json({ msg: "Hello from express" });
  },
}

export default registerController;
