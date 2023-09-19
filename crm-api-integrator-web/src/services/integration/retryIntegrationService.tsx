import axios from "axios";
import { BaseResponse } from "../models/base/baseResponse";
import { SingInRequest } from "../models/login/requests/singInResquest";
import { UserResponse } from "../models/login/responses/userResponse";
import { SingUpRequest } from "../models/login/requests/singUpRequest";
import { ErrorsResponse } from "../models/base/errorsResponse";
import { addScaleCorrector } from "framer-motion";
import { RetryIntegrationRequest } from "../models/integration/retryIntegrationRequest";
import { IntegrationResponse } from "../models/integration/kommoIntegrationResponse";

// Função para fazer a chamada na API de autenticação
export const retryIntegration = async (
  integrationId: string,
  clientId: string,
  clientSecret: string,
  code: string,
  subdomain: string
): Promise<BaseResponse> => {
  try {
    const retryIntegrationRequest: RetryIntegrationRequest = {
      id: integrationId,
      kommoDetails: {
        clientId: clientId,
        clientSecret: clientSecret,
        code: code,
        subdomain: subdomain,
      }
    };
    const response = await axios.post(
      `https://localhost:7236/api/user/integrations/retry`,
      retryIntegrationRequest
    );
    return response.data;
  } catch (error) {
    // Trata erros de conexão ou outros erros da API
    return {
      isSuccessful: false,
      failureMessage: "erro",
    };
  }
};
