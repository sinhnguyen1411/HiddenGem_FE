import apiClient from './api';

export interface GlobalSearchResultItem {
  type: string;
  id: number;
  title?: string;
  name?: string;
  snippet?: string;
}

export interface GlobalSearchResponse {
  data: GlobalSearchResultItem[];
}

class SearchService {
  search(q: string): Promise<GlobalSearchResponse> {
    return apiClient.get<GlobalSearchResponse>('/search', { q });
  }
}

export const searchService = new SearchService();
export default searchService;


