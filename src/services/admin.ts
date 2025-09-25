import apiClient from './api';
import { AdminDashboardResponse, AdminSetRoleRequest, User, AdminReviewStatusRequest, AdminCommentStatusRequest, AdminBlogStatusRequest, BaseData } from './types';

export interface PendingStore {
  id: number;
  ten_cua_hang: string;
}

export interface PendingStoresResponse { data: PendingStore[] }

export interface AdminStoreApproveRequest { action: 'approve' | 'reject' }

export interface UsersResponse {
  data: User[];
}

class AdminService {
  dashboard(): Promise<AdminDashboardResponse> {
    return apiClient.get<AdminDashboardResponse>('/admin/dashboard');
  }

  getUsers(page?: number, per_page?: number): Promise<UsersResponse> {
    return apiClient.get<UsersResponse>('/users', { page, per_page });
  }

  setUserRole(payload: AdminSetRoleRequest): Promise<void> {
    return apiClient.post<void>('/admin/users/role', payload);
  }

  deleteUser(id: number): Promise<void> {
    return apiClient.delete<void>(`/admin/users/${id}`);
  }

  pendingStores(): Promise<PendingStoresResponse> {
    return apiClient.get<PendingStoresResponse>('/admin/pending-stores');
  }

  reviewStore(id: number, payload: AdminStoreApproveRequest): Promise<void> {
    return apiClient.post<void>(`/admin/stores/${id}/approve`, payload);
  }

  search(domain: string, q?: string, trang_thai?: string, role?: string, page?: number, per_page?: number): Promise<BaseData<any>> {
    return apiClient.get<BaseData<any>>('/admin/search', { domain, q, trang_thai, role, page, per_page });
  }

  getReportsSummary(from?: string, to?: string, format?: string): Promise<BaseData<any>> {
    return apiClient.get<BaseData<any>>('/admin/reports/summary', { from, to, format });
  }

  updateReviewStatus(id: number, payload: AdminReviewStatusRequest): Promise<void> {
    return apiClient.patch<void>(`/admin/reviews/${id}`, payload);
  }

  getComments(page?: number, per_page?: number, q?: string, trang_thai?: string, loai?: string): Promise<BaseData<any>> {
    return apiClient.get<BaseData<any>>('/admin/comments', { page, per_page, q, trang_thai, loai });
  }

  updateCommentStatus(id: number, payload: AdminCommentStatusRequest): Promise<void> {
    return apiClient.patch<void>(`/admin/comments/${id}`, payload);
  }

  updateBlogStatus(id: number, payload: AdminBlogStatusRequest): Promise<void> {
    return apiClient.patch<void>(`/admin/blog/${id}/status`, payload);
  }
}

export const adminService = new AdminService();
export default adminService;


