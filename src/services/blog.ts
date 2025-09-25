import apiClient from './api';
import { BaseListData, BlogCreateRequest, BlogUpdateRequest } from './types';

export interface BlogPost {
  id_blog: number;
  tieu_de: string;
  noi_dung: string;
  author?: string;
  thoi_gian_tao?: string;
}

export interface BlogListResponse {
  data: BaseListData<BlogPost[]>;
}

class BlogService {
  list(q?: string): Promise<BlogListResponse> {
    return apiClient.get<BlogListResponse>('/blog', { q });
  }

  create(payload: BlogCreateRequest): Promise<BlogPost> {
    return apiClient.post<BlogPost>('/blog', payload);
  }

  update(id: number, payload: BlogUpdateRequest): Promise<BlogPost> {
    return apiClient.patch<BlogPost>(`/blog/${id}`, payload);
  }

  async getById(id: number): Promise<BlogPost | null> {
    try {
      const response = await this.list();
      const blog = response.data.items.find((item: BlogPost) => item.id_blog === id);
      return blog || null;
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      return null;
    }
  }
}

export const blogService = new BlogService();
export default blogService;


