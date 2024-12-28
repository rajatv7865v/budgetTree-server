import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    const uri = this.config.get('DATABASE.URI');
    if (!uri) {
      console.log('DATABASE_URI is not defined.');
      throw new Error('DATABASE_URI is required but not provided.');
    }

    return {
      uri,
      connectionFactory: (connection) => {
        connection.on('connecting', () => {
          console.log('MongoDB is connecting...');
        });
        connection.on('connected', () => {
          console.log('MongoDB connected successfully!');
        });

        connection.on('error', (error: any) => {
          console.error('MongoDB connection error:', error);
        });

        connection.on('disconnected', () => {
          console.warn('MongoDB connection disconnected!');
        });

        return connection;
      },
    };
  }
}
