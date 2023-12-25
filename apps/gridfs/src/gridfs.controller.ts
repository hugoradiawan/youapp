import { Controller } from '@nestjs/common';
import { GridfsService } from './gridfs.service';
import { RmqContext, MessagePattern, Ctx } from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import { Readable } from 'stream';

@Controller()
export class GridfsController {
  constructor(
    private readonly gridfsService: GridfsService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern('save-file')
  async uploadFile(@Ctx() context: RmqContext): Promise<boolean> {
    const extractData =
      this.sharedService.extractData<Express.Multer.File>(context);
    const result = await this.gridfsService.saveFile(extractData.event.data);
    if (!result || result === null) {
      extractData.nack();
      return null;
    } else {
      extractData.ack();
      return result;
    }
  }

  @MessagePattern('get-file')
  async getFile(
    @Ctx() context: RmqContext,
  ): Promise<Promise<Readable | undefined>> {
    const extractData = this.sharedService.extractData<string>(context);
    const result = await this.gridfsService.getFile(extractData.event.data);
    if (!result || result === null) {
      extractData.nack();
      return null;
    } else {
      extractData.ack();
      return result;
    }
  }
}
