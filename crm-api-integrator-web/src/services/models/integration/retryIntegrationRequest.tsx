import { Integration } from "../../../components/models/integration";
import { KommoIntegrationRequest } from "../account/createAccountRequest";

export interface RetryIntegrationRequest {
  id: string;
  kommoDetails: KommoIntegrationRequest;
}
