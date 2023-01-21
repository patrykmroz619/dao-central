import { Module } from "@nestjs/common";
import { EventsCrawlerService } from "./events-crawler.service";

@Module({
  providers: [EventsCrawlerService],
})
export class EventsCrawlerModule {}
