import apiClient from './api';
import { AdsCreateRequest } from './types';

export interface AdsPackage {
  id: string;
  name: string;
  price: number;
}

export interface AdsPackagesResponse { data: AdsPackage[] }

export interface MyAdsRequestsResponse { data: Array<{ id: number; id_cua_hang: number; goi: string; trang_thai: string; ngay_bat_dau?: string }> }

export interface ActiveAdsResponse { data: Array<{ id: number; goi: string; id_cua_hang: number }> }

class AdsService {
  listPackages(): Promise<AdsPackagesResponse> {
    return apiClient.get<AdsPackagesResponse>('/ads/packages');
  }

  createRequest(payload: AdsCreateRequest): Promise<void> {
    return apiClient.post<void>('/ads/requests', payload);
  }

  myRequests(): Promise<MyAdsRequestsResponse> {
    return apiClient.get<MyAdsRequestsResponse>('/ads/requests/my');
  }

  active(): Promise<ActiveAdsResponse> {
    return apiClient.get<ActiveAdsResponse>('/ads/active');
  }
}

export const adsService = new AdsService();
export default adsService;


