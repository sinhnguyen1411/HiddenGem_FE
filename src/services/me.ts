import apiClient from './api';
import { UpdateProfileRequest, ConsentRequest, BaseData } from './types';

export interface UserProfile {
  id_user: number;
  id: number;
  email: string;
  username: string;
  full_name?: string;
  phone_number?: string;
  role?: string;
}

class MeService {
  getProfile(): Promise<BaseData<UserProfile>> {
    return apiClient.get<BaseData<UserProfile>>('/me/profile');
  }

  updateProfile(payload: UpdateProfileRequest): Promise<BaseData<UserProfile>> {
    return apiClient.patch<BaseData<UserProfile>>('/me/profile', payload);
  }

  recordConsent(payload: ConsentRequest): Promise<void> {
    return apiClient.post<void>('/me/consent', payload);
  }

  exportData(): Promise<Blob | any> {
    return apiClient.get<any>('/me/export');
  }

  getTerms(): Promise<string> {
    return apiClient.get<string>('/policies/terms');
  }

  getPrivacy(): Promise<string> {
    return apiClient.get<string>('/policies/privacy');
  }

  deleteAccount(): Promise<void> {
    return apiClient.delete<void>('/me');
  }
}

export const meService = new MeService();
export default meService;


