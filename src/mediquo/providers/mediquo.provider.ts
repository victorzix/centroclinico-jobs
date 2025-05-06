import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateMediquoPatientDto } from '../dto/create-mediquo-patient.dto';
import { lastValueFrom } from 'rxjs';
import { mediquoRequestUtils } from '../utils/mediquo-request.utils';

@Injectable()
export class MediquoProvider {
  private readonly apiUrl: string;
  private readonly headers: {};

  constructor(private readonly httpService: HttpService) {
    const { headers, url } = mediquoRequestUtils();
    this.apiUrl = url;
    this.headers = headers;
  }

  async createPatient(dto: CreateMediquoPatientDto) {
    try {
      const response = await lastValueFrom(
        this.httpService.put(
          `${this.apiUrl}patients`,
          { patients: [dto] },
          {
            headers: this.headers,
          },
        ),
      );
      return { data: response.data, status: response.status };
    } catch (err) {
      return err;
    }
  }

  async inactivatePatient(dto: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.put(
          `${this.apiUrl}patients`,
          { patients: [dto] },
          {
            headers: this.headers,
          },
        ),
      );
      return { data: response.data, status: response.status };
    } catch (err) {
      return err;
    }
  }
}
