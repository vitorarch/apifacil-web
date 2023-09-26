import { BaseResponse } from "../models/base/baseResponse";
import { CreateAccountRequest, KommoIntegrationRequest } from "../models/account/createAccountRequest";
import api from "../Api Conection/apiConection";

// Função para fazer a chamada na API de autenticação
export const createAccount = async (
  createAccountRequest: CreateAccountRequest<KommoIntegrationRequest>
): Promise<BaseResponse> => {
  try {
    const response = await api.post(
      "/api/account",
      createAccountRequest
    );
    return response.data;
  } catch (error) {
    // Trata erros de conexão ou outros erros da API
    return {
      isSuccessful: false,
      failureMessage: "erro ao criar conta",
    };
  }
};
