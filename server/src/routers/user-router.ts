import { Router } from "express";
import userController from "../controllers/user-controller.js";
import authorizedUserMiddelware from "../middelwares/authorized-user-middelware.js";
import registrationMiddelware from "../middelwares/registration-middelware.js";
import authorizationMiddelware from "../middelwares/authorization-middelware.js";

const router = Router();

router.post('/registration', registrationMiddelware, userController.registration);
router.post('/login', authorizationMiddelware, userController.login);
router.get('/logout', userController.logout);
router.get('/getLogins', authorizedUserMiddelware, userController.getLogins);

export default router;