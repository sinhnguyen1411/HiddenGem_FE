export type ISODateTimeString = string;
export type ISODateString = string;

export interface BaseData<T> {
  data: T;
}

export interface BaseListData<T> {
  items: T;
  page: number;
  per_page: number;
  total: number;
}

// Auth
export type LoginRequest = { email?: string; username?: string; password: string };
export type TokenResponse = { access_token: string; refresh_token: string };
export type RegisterRequest = { username: string; email: string; password: string };
export type RefreshRequest = { refresh_token: string };
export type LogoutRequest = { refresh_token?: string };
export type ForgotPasswordRequest = { email: string };
export type ResetPasswordRequest = { token: string; new_password: string };
export type ChangePasswordRequest = { current_password: string; new_password: string };
export type VerifyEmailConfirmRequest = { token: string };

// Users
export interface User {
  id_user: number;
  email: string;
  full_name: string;
  username: string;
  phone_number: string;
  joined_at: string;
  role: 'customer' | 'admin' | 'moderator';
}

export type UpdateProfileRequest = { full_name?: string; phone_number?: string; email?: string };
export type ConsentRequest = { terms_version?: string; privacy_version?: string };

// Cafes / Stores
export type Cafe = {
  id_cua_hang: number;
  id_cua_hang_cha?: number | null;
  id_chu_so_huu: number;
  ten_cua_hang: string;
  mo_ta?: string | null;
  diem_danh_gia_trung_binh: string;
  luot_xem: number;
  id_trang_thai?: number | null;
  id_vi_tri?: number | null;
  ngay_tao: ISODateTimeString;
};

export type Paginated<T> = { items: T[]; total: number; page: number; per_page: number };
export type CafeListResponse = { data: Paginated<Cafe> };
export type CreateStoreRequest = { ten_cua_hang: string; mo_ta?: string };
export type UploadStoreImageRequest = { file: File | Blob; is_avatar?: number };

// Reviews
export type CreateReviewRequest = { rating: number; content: string };

// Vouchers
export type CreateVoucherRequest = {
  ma_voucher: string;
  ten_voucher?: string;
  gia_tri_giam: number;
  loai_giam_gia: 'percent' | 'amount';
  ngay_het_han?: ISODateTimeString;
  so_luong_con_lai?: number;
};
export type AssignVoucherRequest = { id_voucher: number; id_cua_hang: number };

// Promotions
export type CreatePromotionRequest = {
  ten_chuong_trinh: string;
  mo_ta?: string;
  ngay_bat_dau: ISODateTimeString;
  ngay_ket_thuc: ISODateTimeString;
};
export type PromotionApplyRequest = { id_cua_hang: number };
export type PromotionReviewRequest = { id_cua_hang: number; trang_thai: 'da_duyet' | 'tu_choi' };

// Blog
export type BlogCreateRequest = { tieu_de: string; noi_dung: string };
export type BlogUpdateRequest = { tieu_de: string; noi_dung: string };

// Banners
export type Banner = {
  id_banner: number;
  tieu_de?: string | null;
  mo_ta?: string | null;
  url_anh: string;
  link_url?: string;
  vi_tri?: string | null;
  thu_tu: number;
  active: boolean;
  thoi_gian_tao: ISODateTimeString;
};
export type BannerCreateRequest = {
  tieu_de?: string;
  mo_ta?: string;
  url_anh: string;
  link_url?: string;
  vi_tri?: string;
  thu_tu?: number;
  active?: number;
};
export type BannersListResponse = { data: Banner[] };

// Chat
export type ChatSendRequest = { noi_dung: string; to_user_id?: number };

// Wallet
export type SimulateBankTransferRequest = { noi_dung: string; so_tien: number };

// Admin
export type AdminDashboardData = { users: number; shops: number; stores: number; reviews: number; vouchers: number; promos: number };
export type AdminDashboardResponse = { data: AdminDashboardData };
export type AdminSetRoleRequest = { id_user: number; role: 'admin' | 'shop' | 'customer' };
export type AdminStoreApproveRequest = { action: 'approve' | 'reject' };
export type AdminReviewStatusRequest = { trang_thai: 'cho_duyet' | 'da_duyet' | 'tu_choi' | 'an' };
export type AdminCommentStatusRequest = { trang_thai: 'cho_duyet' | 'da_duyet' | 'tu_choi' | 'an' };
export type AdminBlogStatusRequest = { trang_thai: 'nhap' | 'cong_bo' | 'an' };

// Content
export type ContentUpdateRequest = { content: string };

// Contact
export type ContactInfo = {
  email: string;
  zalo: string;
  phone: string;
};

// Ads
export type AdsCreateRequest = { id_cua_hang: number; goi: string; ngay_bat_dau?: ISODateString };
export type AdsReviewRequest = { trang_thai: 'da_duyet' | 'tu_choi' };

// Generic API shapes
export type ApiSuccess<T> = T;
export type ApiError = { message: string; code?: string; details?: unknown };

export interface BaseId {
    id: number
}
