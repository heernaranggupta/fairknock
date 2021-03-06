import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsNotBlank } from "../../../utils/IsNotBlank";
import { Offer } from "../../Offers/Offer/model";
import { State } from "../../State/model";
import { User } from "../../User/model";
import { PropertyOptionProperty } from "../PropertyOptionProperty/model";
import { PropertyType } from "../PropertyType/model";
import { UserAnswerTemplate } from "./../../Disclouser/UserAnswerTemplate/model";
import { PropertyAdditionalItem } from "./../PropertyAddItems/model";
import { PropertyMedia } from "./../PropertyMedia/model";

@Entity()
export class Property extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @IsUrl()
  @Column({ nullable: true })
  displayUrl: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @Column()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @Column()
  addressLine1: string;

  @IsString()
  @Column({ nullable: true })
  addressLine2: string;

  @IsString()
  @Column({ nullable: true })
  community: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @Column()
  city: string;

  @IsNotEmpty()
  @IsString()
  @IsNotBlank()
  @Column()
  zipCode: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  squareFeet: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @Min(0)
  @Column({ default: 0 })
  numberOfFloor: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(2100)
  @Min(1800)
  @Column()
  yearBuilt: number;

  @IsNotEmpty()
  @IsNumber()
  @Column({ default: 0 })
  HOADue: number;

  @IsNotEmpty()
  @IsNumber()
  @Column({ default: 0 })
  LotSize: number;

  @Column({ default: "draft" })
  status: string;

  @Column()
  userId: number;

  @Column()
  nanoId: string;

  @ManyToOne(() => State, (state) => state.properties)
  state: State;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => PropertyType, (propertyType) => propertyType)
  propertyType: PropertyType;

  @OneToMany(
    () => PropertyOptionProperty,
    (propertyOptionProperty) => propertyOptionProperty.property
  )
  propertyOptionsConnection: PropertyOptionProperty[];

  @OneToMany(() => PropertyMedia, (propertyMedia) => propertyMedia.property)
  propertyMedia: PropertyMedia[];

  @OneToMany(
    () => UserAnswerTemplate,
    (userAnswerTemplate) => userAnswerTemplate.property
  )
  userAnswerTemplates: UserAnswerTemplate[];

  @OneToMany(() => Offer, (offer) => offer.property)
  offers: Offer[];

  @ManyToMany(() => User, (user) => user.propertyInvitations)
  @JoinTable()
  invitationsAccepted: User[];

  @ManyToMany(
    () => PropertyAdditionalItem,
    (propertyAdditionalItem) => propertyAdditionalItem.properties
  )
  @JoinTable()
  propertyAdditionalItems: PropertyAdditionalItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
