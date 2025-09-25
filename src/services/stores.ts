import apiClient from './api';
import { CreateStoreRequest, BaseData } from './types';

export interface StoreSummary {
  id_cua_hang: number;
  ten_cua_hang: string;
  mo_ta?: string | null;
}

export interface MyStoresResponse {
  data: StoreSummary[];
}

export interface UpdateStoreRequest {
  ten_cua_hang?: string;
  mo_ta?: string;
}

export interface CreateBranchRequest {
  // Backend docs did not define fields; include common ones
  ten_chi_nhanh: string;
  dia_chi?: string;
}

class StoresService {
  create(payload: CreateStoreRequest): Promise<StoreSummary> {
    return apiClient.post<StoreSummary>('/stores', payload);
  }

  update(id: number, payload: UpdateStoreRequest): Promise<StoreSummary> {
    return apiClient.patch<StoreSummary>(`/stores/${id}`, payload);
  }

  createBranch(id: number, payload: CreateBranchRequest): Promise<void> {
    return apiClient.post<void>(`/stores/${id}/branches`, payload);
  }

  myStores(): Promise<MyStoresResponse> {
    return apiClient.get<MyStoresResponse>('/me/stores');
  }

  uploadImage(id: number, file: File | Blob, is_avatar?: number): Promise<void> {
    const fd = new FormData();
    fd.append('file', file);
    if (typeof is_avatar !== 'undefined') fd.append('is_avatar', String(is_avatar));
    return apiClient.postForm<void>(`/stores/${id}/images`, fd);
  }

  getImages(id: number): Promise<BaseData<{ images: any[] }>> {
    return apiClient.get<BaseData<{ images: any[] }>>(`/stores/${id}/images`);
  }

  getDashboard(id: number): Promise<BaseData<any>> {
    return apiClient.get<BaseData<any>>(`/me/stores/${id}/dashboard`);
  }
}

export const storesService = new StoresService();
export default storesService;


