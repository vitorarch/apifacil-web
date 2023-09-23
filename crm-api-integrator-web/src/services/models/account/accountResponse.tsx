import { IntegrationResponse, KommoIntegrationResponse } from "../integration/kommoIntegrationResponse";
import { UserResponse } from "../login/responses/userResponse";

export interface AccountResponse {
    id: string;
    name: string;
    createdAt: Date;
    isActive: boolean;
    createdBy: UserResponse;
    integration: IntegrationResponse;
  }
  