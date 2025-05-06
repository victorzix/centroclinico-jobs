import { HttpModule } from '@nestjs/axios';
import { MediquoProvider } from './providers/mediquo.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  exports: [MediquoProvider],
  providers: [MediquoProvider],
})
export class MediquoModule {}
