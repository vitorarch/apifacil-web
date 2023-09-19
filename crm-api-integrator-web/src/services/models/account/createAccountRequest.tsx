import { Integration } from "../../../components/models/integration";

export interface CreateAccountRequest<TIntegration> {
    userId: string;
    name: string;
    usersAccessRights: string[];
    integration: IntegrationRequest<TIntegration>;
  }

  export interface IntegrationRequest<TIntegration> {
    integrationType: Integration.Kommo,
    integrationDetails: TIntegration,
  }

  export interface  KommoIntegrationRequest {
    clientId: string,
    clientSecret: string,
    code: string
    subdomain: string
  }