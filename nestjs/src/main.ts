import agent from 'skywalking-backend-js'
if (process.env.SW_AGENT_COLLECTOR_BACKEND_SERVICES) {
  agent.start()
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4200);
}
bootstrap();
