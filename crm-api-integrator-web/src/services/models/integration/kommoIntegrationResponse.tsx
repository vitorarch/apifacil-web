export interface KommoIntegrationResponse {
  subdomain: string;
  clientId: string;
  clientSecret: string;
}

export interface IntegrationResponse {
  id: string;
  hasSuccessfullyConnected: boolean;
  type: string;
  integrationToken: string;
  isActive: boolean;
  details: KommoIntegrationResponse
}
