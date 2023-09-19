import axios from "axios";
import { BaseResponse } from "../models/base/baseResponse";


// Função para fazer a chamada na API de autenticação
export const getAccountById = async (   
  accountId: string
): Promise<BaseResponse> => {
  try {
    const encodedId = encodeURIComponent(accountId);
    const response = await axios.get(
      `https://localhost:7236/api/user/accounts/${encodedId}`,
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
