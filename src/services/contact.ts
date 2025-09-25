import apiClient from './api';
import { ContactInfo, BaseData } from './types';

class ContactService {
  getContactInfo(): Promise<BaseData<ContactInfo>> {
    return apiClient.get<BaseData<ContactInfo>>('/contact');
  }
}

export const contactService = new ContactService();
export default contactService;
