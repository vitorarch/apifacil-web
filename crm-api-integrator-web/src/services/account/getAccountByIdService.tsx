import { BaseResponse } from "../models/base/baseResponse";
import api from "../Api Conection/apiConection";


// Função para fazer a chamada na API de autenticação
export const getAccountById = async (   
  accountId: string
): Promise<BaseResponse> => {
  try {
    const encodedId = encodeURIComponent(accountId);
    const response = await api.get(
      `/api/user/accounts/${encodedId}`,
    );
    return response.data;
  } catch (error) {
    // Trata erros de conexão ou outros erros da API
    return {
      isSuccessful: false,
      failureMessage: "erro ao buscar conta",
    };
  }
};
