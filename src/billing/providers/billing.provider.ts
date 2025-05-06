import { CelcashProvider } from './celcash/celcash.provider';
import { BILLING_STRATEGY } from '../tokens';
import { BillingStrategy } from '../strategies/billing.strategy';

export const paymentGatewayProvider = {
  provide: BILLING_STRATEGY,
  useFactory: (celcash: CelcashProvider, iugu: null): BillingStrategy => {
    const integration = process.env.BILLING_STRATEGY;
    if (integration === 'iugu') return iugu;
    return celcash;
  },
  inject: [CelcashProvider],
};
