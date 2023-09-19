import { SinginIntegrationResponse } from '../integration/singinIntegrationResponse';

export interface SinginAccountResponse {
    id: string;
    name: string;
    integration: SinginIntegrationResponse;
  }
  