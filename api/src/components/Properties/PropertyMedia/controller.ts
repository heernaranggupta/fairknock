import { validate } from "class-validator";
import { NextFunction, Response } from "express";
import { InputError } from "../../../errors/InputError";
import { toMapErrors } from "../../../utils/toMapErrors";
import { logger } from "./../../../configs/Logger";
import { BadRequest } from "./../../../errors/BadRequest";
import { NotFound } from "./../../../errors/NotFound";
import { Unathorized } from "./../../../errors/Unauthorized";
import { AuthRequest } from "./../../../types/AuthRequest";
import { Property } from "./../Property/model";
import { PropertyMedia } from "./model";
import { PropertyMediaType } from "./propertyMediaType";

export const createPropertyMedia = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new BadRequest("user cannot be empty");
    }

    const propertyId = req.body.propertyId || -1;
    const data = req.body.data || [];

    const validData: PropertyMedia[] = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      const proMed = new PropertyMedia();

      if (!Object.values(PropertyMediaType).includes(item.mediaType)) {
        throw new BadRequest("invalid media type");
      }

      proMed.mediaType = item.mediaType;
      proMed.url = item.url;

      const errors = await validate(proMed);
      if (errors.length) {
        const { errorMap } = toMapErrors(errors);
        throw new InputError(errorMap);
      }

      validData.push(proMed);
    }

    const property = await Property.findOne(propertyId);

    if (!property) {
      throw new NotFound("property", propertyId);
    }
    if (property.userId !== user.id) {
      throw new Unathorized();
    }

    for (let i = 0; i < validData.length; i++) {
      const item = validData[i];
      item.property = property;

      try {
        await item.save({ reload: false });
      } catch (error) {
        logger.error(error);
      }
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

export const deletePropertyMedia = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new BadRequest("user cannot be empty");
    }

    const propertyId = req.body.propertyId || -1;
    const data: number[] = req.body.data || [];

    const property = await Property.findOne(propertyId);
    if (!property) {
      throw new NotFound("property", propertyId);
    }

    if (property.userId !== user.id) {
      throw new Unathorized();
    }

    data.forEach((item) => {
      PropertyMedia.delete(item);
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};