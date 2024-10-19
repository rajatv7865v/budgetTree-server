// import { Logger, Module, OnModuleInit } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Connection } from 'typeorm';

// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => {
//         return {
//           type: 'mysql',
//           host: 'localhost',
//           port: 3306,
//           username: 'root',
//           password: 'Rajat123@',
//           database: 'development_test',
//           entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//           synchronize: true,
//         };
//       },
//     }),
//   ],
// })
// export class DatabaseModule implements OnModuleInit {
//   private readonly logger = new Logger(DatabaseModule.name);

//   constructor(private readonly connection: Connection) {}

//   async onModuleInit() {
//     try {
//       if (this.connection.isConnected) {
//         this.logger.log('Database connected successfully');
//       }
//     } catch (error) {
//       this.logger.error('Database connection failed', error);
//     }
//   }
// }
