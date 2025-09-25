import apiClient from './api';
import { CreateVoucherRequest, AssignVoucherRequest } from './types';

export interface StoreVouchersResponse {
  data: Array<{
    id_voucher: number;
    ma_voucher: string;
    ten_voucher?: string | null;
    gia_tri_giam: number;
    loai_giam_gia: 'percent' | 'amount';
    ngay_het_han?: string | null;
    so_luong_con_lai?: number | null;
  }>;
}

class VouchersService {
  create(payload: CreateVoucherRequest): Promise<void> {
    return apiClient.post<void>('/vouchers', payload);
  }

  assign(payload: AssignVoucherRequest): Promise<void> {
    return apiClient.post<void>('/vouchers/assign', payload);
  }

  listByStore(storeId: number): Promise<StoreVouchersResponse> {
    return apiClient.get<StoreVouchersResponse>(`/stores/${storeId}/vouchers`);
  }
}

export const vouchersService = new VouchersService();
export default vouchersService;


