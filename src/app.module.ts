import { Module, HttpModule, HttpService } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

const API_KEY = '123456789';

@Module({
  imports: [HttpModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
    {
      // this is a good idea to connect to a database,DONT USE THIS TO CALL ANOTHER API
      // Features: async and dependency injection
      provide: 'TASKS',
      useFactory: async (https: HttpService): Promise<HttpService> => {
        const tasks = await https
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
