import apiClient from './api';
import { ContentUpdateRequest, BaseData } from './types';

class ContentService {
  getContent(slug: string): Promise<BaseData<{ content: string }>> {
    return apiClient.get<BaseData<{ content: string }>>(`/content/${slug}`);
  }

  updateContent(slug: string, payload: ContentUpdateRequest): Promise<BaseData<{ content: string }>> {
    return apiClient.put<BaseData<{ content: string }>>(`/content/${slug}`, payload);
  }
}

export const contentService = new ContentService();
export default contentService;
