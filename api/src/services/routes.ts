import express, { NextFunction, Request, Response } from "express";
import AuthRouter from "../components/Auth/routes";
import QuestionTemplateRouter from "../components/Disclouser/QuestionTemplate/routes";
import QuestionTypeRouter from "../components/Disclouser/QuestionType/routes";
import userAnswerTemplateRouter from "../components/Disclouser/UserAnswerTemplate/routes";
import MediaUploaderRouter from "../components/MediaUploader/routes";
import offersRouter from "../components/Offers/Offer/routes";
import offerQuestionRouter from "../components/Offers/OfferQuestion/routes";
import PropertyRouter from "../components/Properties/Property/routes";
import PropertyItemRouter from "../components/Properties/PropertyAddItems/routes";
import PropertyInvitationRouter from "../components/Properties/PropertyInvitations/routes";
import PropertyMediaRouter from "../components/Properties/PropertyMedia/routes";
import PropertyOptionRouter from "../components/Properties/PropertyOption/routes";
import PropertyOptionConnectionRouter from "../components/Properties/PropertyOptionProperty/routes";
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
router.use("/propertyOption", PropertyOptionRouter);
router.use("/propertyOptionConnection", PropertyOptionConnectionRouter);
router.use("/propertyMedia", PropertyMediaRouter);
router.use("/propertyItems", PropertyItemRouter);
router.use("/property", PropertyRouter);
router.use("/media", MediaUploaderRouter);
router.use("/questionType", QuestionTypeRouter);
router.use("/questionTemplate", QuestionTemplateRouter);
router.use("/propertyInvitation", PropertyInvitationRouter);
router.use("/userAnswerTemplate", userAnswerTemplateRouter);
router.use("/offerQuestion", offerQuestionRouter);
router.use("/offers", offersRouter);

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
