import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Automation {
  @Prop({ unique: false })
  formId: string;

  @Prop({ unique: false })
  question?: string;

  @Prop({ unique: false })
  campaignId: string;

  @Prop({ unique: false, type: Date })
  expiry: Date;

  @Prop({ unique: false })
  approvalType: string;
}

export type AutomationDocument = Automation & Document;

export const AutomationSchema = SchemaFactory.createForClass(Automation);

export const AUTOMATION_MODEL = Automation.name;
