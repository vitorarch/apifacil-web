import { BaseResponse } from "../models/base/baseResponse";
import { SingInRequest } from "../models/login/requests/singInResquest";
import { SingUpRequest } from "../models/login/requests/singUpRequest";
import api from "../Api Conection/apiConection";

// Função para fazer a chamada na API de autenticação
export const authenticate = async (
  email: string,
  password: string
): Promise<BaseResponse> => {
  try {
    const singInRequest: SingInRequest = {
      email: email,
      password: password,
    };
    const response = await api.post("/api/User/singin", singInRequest);
    return response.data;
  } catch (error) {
    // Trata erros de conexão ou outros erros da API
    return {
      isSuccessful: false,
      failureMessage: "erro ao registrar usuario",
    };
  }
};

export const register = async (
  name: string,
  email: string,
  phone: string,
  password: string
): Promise<BaseResponse> => {
  try {
    const singUpRequest: SingUpRequest = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };
    const response = await api.post(
      "/api/User/singup",
      singUpRequest
    );
    return response.data;
  } catch (error) {
    // Trata erros de conexão ou outros erros da API
    return {
      isSuccessful: false,
      failureMessage: "erro ao registrar usuario",
    };
  }
};
