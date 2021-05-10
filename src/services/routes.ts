import express, { NextFunction, Request, Response } from "express";
import AuthRouter from "../components/Auth/routes";
import PropertyRouter from "../components/Properties/Property/routes";
import PropertyTypeRouter from "../components/Properties/PropertyType/routes";
import RoleRouter from "../components/Role/routes";
import StateRouter from "../components/State/routes";
import UserRouter from "../components/User/routes";
import { NotFound } from "../errors/NotFound";

const router = express.Router();

router.use("/role", RoleRouter);
router.use("/user", UserRouter);
router.use("/auth", AuthRouter);
router.use("/state", StateRouter);
router.use("/propertyType", PropertyTypeRouter);
router.use("/property", PropertyRouter);

router.get("/healthCheck", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API IS WORKING",
  });
});

router.use("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new NotFound("API", req.originalUrl));
});

export default router;
