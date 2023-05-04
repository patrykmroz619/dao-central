import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DiscoverUnsavedDaosService } from "../../domain/application/discover-unsaved-daos.service";

@Injectable()
export class DiscoverDaoCron {
  private readonly logger = new Logger(DiscoverDaoCron.name);

  constructor(private discoverUnsavedDaosService: DiscoverUnsavedDaosService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  public async handleCron() {
    try {
      await this.discoverUnsavedDaosService.discoverDaos();
    } catch (error: unknown) {
      this.logger.error(`Error while discovering daos: ${error}`);
    }
  }
}
