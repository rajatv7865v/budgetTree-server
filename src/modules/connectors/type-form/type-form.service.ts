import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';
import { CustomHttpException } from 'src/core/exceptions';
import { SaveAutomationDto } from './dto/saveAutomation.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  AUTOMATION_MODEL,
  AutomationDocument,
} from 'src/database/schema/automation';
import { Model } from 'mongoose';

@Injectable()
export class TypeFormService {
  private CLIENT_ID: string;
  private REDIRECT_URI: string;
  private CLIENT_SECRET: string;

  constructor(
    @InjectModel(AUTOMATION_MODEL)
    private readonly automationModel: Model<AutomationDocument>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.CLIENT_ID = this.configService.get<string>('TYPEFORM.ID');
    this.REDIRECT_URI = this.configService.get<string>('TYPEFORM.URI');
    this.CLIENT_SECRET = this.configService.get<string>('TYPEFORM.SECRET');
  }

  async connect(res: any) {
    try {
      const url = `https://api.typeform.com/oauth/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&scope=forms:write+forms:read+responses:read+webhooks:write`;
      return res.json({ redirectUrl: url });
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }

  async getAccessToken(code: string) {
    const ACCESS_TOKEN_URL = 'https://api.typeform.com/oauth/token';
    const body = {
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.REDIRECT_URI,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(ACCESS_TOKEN_URL, body, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new CustomHttpException(error);
    }
  }

  async getAllForms(accessToken: string) {
    const URL: string = 'https://api.typeform.com/forms';
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(URL, { headers }),
      );
      return response.data; // Returns all forms
    } catch (error) {
      console.error(
        'Error fetching forms:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async createQuestion(accessToken: string, formId: string, question: string) {
    console.log('formId', formId);
    try {
      const url = `https://api.typeform.com/forms/${formId}`;

      // Fetch the existing form
      const form = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('old form', form.data.fields);
      // Add the new question to the existing fields
      const updatedFields = [
        ...form.data.fields,
        {
          title: question,
          type: 'short_text',
        },
      ];

      const response = await axios.put(
        url,
        {
          title: form.data.title,
          fields: updatedFields,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('response', response);
      console.log('Form updated:', response.data);
      return response.data;
    } catch (error) {
      console.log('error', error);
      throw new CustomHttpException(error);
    }
  }
  async saveAutomation(saveAutomationDto: SaveAutomationDto) {
    try {
      const dosumentResponse = await this.automationModel.create({
        formId: saveAutomationDto?.formId,
        question: saveAutomationDto?.question,
        campaignId: saveAutomationDto?.campaignId,
        expiry: new Date(
          new Date().setMonth(
            new Date().getMonth() + Number(saveAutomationDto?.expiry || 1),
          ),
        ),
        approvalType: saveAutomationDto?.approvalType,
      });
      await dosumentResponse.save();
    } catch (error) {
      console.log(error);
      throw new CustomHttpException(error);
    }
  }

  async getAllAutomation() {
    try {
      return await this.automationModel.find();
    } catch (error) {
      console.log(error);
      throw new CustomHttpException(error);
    }
  }
}
