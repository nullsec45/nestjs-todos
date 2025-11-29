import { PrismaService } from "./prisma.service";
import { Global, Module, NestModule } from "@nestjs/common";
import { MiddlewareConsumer } from "@nestjs/common/interfaces/middleware/middleware-consumer.interface";    

@Global()
@Module({
    providers:[PrismaService],
    exports:[PrismaService],
})

export class CommonModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    }
}