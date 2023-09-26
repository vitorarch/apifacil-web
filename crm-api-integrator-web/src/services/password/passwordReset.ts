import api from "../Api Conection/apiConection";
import { BaseResponse } from "../models/base/baseResponse";

export const sendResetEmail = async (email: string): Promise<BaseResponse> => {
  try {
    const response = await api.post("/api/User/reset-password", null ,{
      params: {
        email
      }
    });
    return response.data;
  } catch (error) {
    // Trata erros de conexão ou outros erros da API
    return {
      isSuccessful: false,
      failureMessage: "Erro ao enviar email.",
    };
  }
}

export const resetPassword = async (password: string, id: string): Promise<BaseResponse> => {
  try {
    const response = await api.patch(`/api/User/reset-password/${id}`, password);
    return response.data;
  } catch (error) {
    // Trata erros de conexão ou outros erros da API
    return {
      isSuccessful: false,
      failureMessage: "Erro ao enviar email.",
    };
  }
}