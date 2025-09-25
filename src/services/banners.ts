import apiClient from './api';
import { Banner, BannerCreateRequest, BannersListResponse } from './types';

class BannersService {
  list(params?: { vi_tri?: string; active?: number }): Promise<BannersListResponse> {
    return apiClient.get<BannersListResponse>('/banners', params);
  }

  create(payload: BannerCreateRequest): Promise<Banner> {
    return apiClient.post<Banner>('/banners', payload);
  }

  update(id: number, payload: Partial<BannerCreateRequest>): Promise<Banner> {
    return apiClient.patch<Banner>(`/banners/${id}`, payload);
  }

  async getById(id: number): Promise<Banner | null> {
    try {
      const response = await this.list();
      const banner = response.data.find((item: Banner) => item.id_banner === id);
      return banner || null;
    } catch (error) {
      console.error('Error fetching banner by ID:', error);
      return null;
    }
  }
}

export const bannersService = new BannersService();
export default bannersService;


