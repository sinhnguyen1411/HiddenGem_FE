import apiClient from './api';
import { CreatePromotionRequest, PromotionApplyRequest, PromotionReviewRequest, Cafe } from './types';

export interface Promotion {
  id_khuyen_mai: number;
  ten_chuong_trinh: string;
  loai_ap_dung: string
  mo_ta?: string | null;
  ngay_bat_dau: string;
  ngay_ket_thuc: string;
  store?: Cafe; // Store information
}

export interface StorePromotionsResponse {
  data: Array<{ id_khuyen_mai: number; ten_chuong_trinh: string; loai_ap_dung: string; mo_ta?: string | null; ngay_bat_dau: string; ngay_ket_thuc: string }>;
}

export interface AllPromotionsResponse {
  data: Promotion[];
}

class PromotionsService {
  create(payload: CreatePromotionRequest): Promise<void> {
    return apiClient.post<void>('/promotions', payload);
  }

  apply(id: number, payload: PromotionApplyRequest): Promise<void> {
    return apiClient.post<void>(`/promotions/${id}/apply`, payload);
  }

  review(id: number, payload: PromotionReviewRequest): Promise<void> {
    return apiClient.post<void>(`/promotions/${id}/review`, payload);
  }

  listByStore(storeId: number): Promise<StorePromotionsResponse> {
    return apiClient.get<StorePromotionsResponse>(`/stores/${storeId}/promotions`);
  }

  async getAllPromotions(): Promise<AllPromotionsResponse> {
    // First get all stores
    const storesResponse = await apiClient.get<{ data: { items: Cafe[] } }>('/cafes');
    const stores = storesResponse.data.items;

    // Then get promotions for each store
    const allPromotions: Promotion[] = [];
    
    for (const store of stores) {
      try {
        const promotionsResponse = await this.listByStore(store.id_cua_hang);
        const promotions = promotionsResponse.data.map(promo => ({
          ...promo,
          store: store
        }));
        allPromotions.push(...promotions);
      } catch (error) {
        console.warn(`Failed to fetch promotions for store ${store.id_cua_hang}:`, error);
        // Continue with other stores even if one fails
      }
    }

    return { data: allPromotions };
  }
}

export const promotionsService = new PromotionsService();
export default promotionsService;


