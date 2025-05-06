import { CreateMediquoPatientDto } from '../dto/create-mediquo-patient.dto';

export class MediquoBuilder {
  static buildActivatePatientTelemedicine(dto: any): CreateMediquoPatientDto {
    return {
      locale: 'pt',
      plan: 'telemedicina',
      code: dto.id,
      first_name: dto.name,
    }
  }

  static buildInactivatePatientTelemedicine(dto: any) {
    return {
      locale: 'pt',
      plan: null,
      code: dto.id,
      first_name: dto.name,
    }
  }
}