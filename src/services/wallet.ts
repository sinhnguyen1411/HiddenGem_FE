import apiClient from './api';

export interface WalletBalance {
  balance: number;
  currency?: string;
}

export interface WalletHistoryItem {
  id: number;
  amount: number;
  type: 'credit' | 'debit';
  description?: string;
  created_at: string;
}

export interface WalletHistoryResponse {
  data: WalletHistoryItem[];
}

export interface DepositInstructions {
  instructions: string;
}

export interface SimulateBankTransferRequest { noi_dung: string; so_tien: number }

class WalletService {
  getBalance(): Promise<WalletBalance> {
    return apiClient.get<WalletBalance>('/me/wallet');
  }

  getHistory(params?: { limit?: number; offset?: number }): Promise<WalletHistoryResponse> {
    return apiClient.get<WalletHistoryResponse>('/me/wallet/history', params);
  }

  getDepositInstructions(): Promise<DepositInstructions> {
    return apiClient.get<DepositInstructions>('/me/wallet/deposit-instructions');
  }

  simulateBankTransfer(payload: SimulateBankTransferRequest): Promise<void> {
    return apiClient.post<void>('/simulate/bank-transfer', payload);
  }
}

export const walletService = new WalletService();
export default walletService;


