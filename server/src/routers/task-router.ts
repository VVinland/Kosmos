import { Router } from "express";
import taskContoller from "../controllers/task-contoller.js";
import authorizedUserMiddelware from "../middelwares/authorized-user-middelware.js";
import createTaskMiddelware from "../middelwares/create-task-middleware.js";
import updateTaskMiddelware from "../middelwares/update-task-middelware.js";

const router = Router();

router.post('/create', authorizedUserMiddelware, createTaskMiddelware, taskContoller.create);
router.post('/getCreatedTasks', authorizedUserMiddelware, taskContoller.getCreatedTasks);
router.post('/getAssignedTasks', authorizedUserMiddelware, taskContoller.getAssignedTasks);
router.patch('/update', authorizedUserMiddelware, updateTaskMiddelware, taskContoller.update);
router.delete('/delete', authorizedUserMiddelware, taskContoller.delete);

export default router;