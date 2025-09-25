import apiClient from './api';

class OpsService {
  root(): Promise<string> {
    return apiClient.get<string>('/');
  }

  csrfToken(): Promise<string> {
    return apiClient.get<string>('/csrf-token');
  }

  health(): Promise<string> {
    return apiClient.get<string>('/health');
  }

  ready(): Promise<string> {
    return apiClient.get<string>('/ready');
  }
}

export const opsService = new OpsService();
export default opsService;


