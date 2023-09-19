import { AccountResponse } from '../../account/accountResponse';
import { SinginAccountResponse } from '../../account/singinAccountResponse'

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    accounts: SinginAccountResponse[];
    defaultAccount: AccountResponse
  }
  