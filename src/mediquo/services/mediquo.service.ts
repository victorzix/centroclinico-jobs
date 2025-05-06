import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { BadRequestException } from '@nestjs/common';
import { MediquoProvider } from '../providers/mediquo.provider';
import { MediquoBuilder } from '../builders/mediquo.builder';

@Processor('telemedicine', { limiter: { max: 1, duration: 1000 } })
export class MediquoService extends WorkerHost {
  constructor(private readonly mediquoProvider: MediquoProvider) {
    super();
  }

  async process(job: Job, token?: string): Promise<any> {
    switch (job.name) {
      case 'activateTelemedicine':
        await this.activateTelemedicine(job.data);
        break;
      case 'inactivateTelemedicine':
        await this.inactivateTelemedicine(job.data);
        break;
      default:
        throw new BadRequestException('Não foi possível processar a fila');
    }
  }

  async activateTelemedicine(dto: any): Promise<any> {
    try {
      await this.mediquoProvider.createPatient(
        MediquoBuilder.buildActivatePatientTelemedicine(dto),
      );
    } catch (err) {
      console.error(err);
    }
  }

  async inactivateTelemedicine(dto: any): Promise<any> {
    try {
      await this.mediquoProvider.inactivatePatient(
        MediquoBuilder.buildInactivatePatientTelemedicine(dto),
      );
    } catch (err) {
      console.error(err);
    }
  }
}
