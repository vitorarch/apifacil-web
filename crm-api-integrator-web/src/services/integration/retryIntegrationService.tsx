import { BaseResponse } from "../models/base/baseResponse";
import { RetryIntegrationRequest } from "../models/integration/retryIntegrationRequest";
import api from "../Api Conection/apiConection";

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
    const response = await api.post(
      `/api/user/integrations/retry`,
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
