import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Input, Button } from '../../components';
import './StoreProfileEdit.css';

interface StoreProfileEditProps {
  className?: string;
}

const StoreProfileEdit: React.FC<StoreProfileEditProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState<string>('The coffee house');
  const [storeLocation, setStoreLocation] = useState<string>('Ho Chi Minh');
  const [amenities1, setAmenities1] = useState<string>('Free Wi-Fi, Suitable for children');
  const [amenities2, setAmenities2] = useState<string>('Group, Welcoming LGBTQ+ people');
  const [amenities3, setAmenities3] = useState<string>('Take-out, single dining, group and family dining');
  const [parking1, setParking1] = useState<string>('Free parking, Plenty of parking');
  const [payment, setPayment] = useState<string>('Debit card, Credit card');
  const [hours, setHours] = useState<string>('8:00 AM - 22:00 PM');
  const [phone, setPhone] = useState<string>('+84 8009396321');
  const [email, setEmail] = useState<string>('thecoffehouse@gmail.com');
  const [error, setError] = useState<string | null>(null);

  const onSave = () => {
    setError(null);
    if (!storeName || !storeLocation) {
      setError('Name and location are required');
      return;
    }
    // API call to save store profile would go here
    navigate(-1);
  };

  const onCancel = () => navigate(-1);

  const onChangeStoreCover = () => {
    // Placeholder for image update flow
  };

  return (
    <div className={`store-profile-edit ${className}`}>
      <div className="store-profile-edit__header">
        <div className="store-profile-edit__breadcrumbs">
          <Text variant="span" size="sm" color="secondary">Pages / Store</Text>
          <Text variant="span" size="xl" color="primary" className="store-profile-edit__breadcrumbs-current">Edit store</Text>
        </div>
        <div className="store-profile-edit__actions">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={onSave}>Save</Button>
        </div>
      </div>

      <div className="store-profile-edit__card">
        <div className="store-profile-edit__cover">
          <div className="store-profile-edit__coverImage" aria-hidden="true" />
          <button className="store-profile-edit__editCover" onClick={onChangeStoreCover} aria-label="Change cover image">
            <span className="store-profile-edit__editCoverIcon" />
          </button>
        </div>

        <div className="store-profile-edit__formGrid">
          <div className="store-profile-edit__field">
            <Text variant="p" size="sm" color="black">Store name</Text>
            <Input type="text" fullWidth value={storeName} onChange={(e: any) => setStoreName(e.target.value)} />
          </div>
          <div className="store-profile-edit__field">
            <Text variant="p" size="sm" color="black">Location</Text>
            <Input type="text" fullWidth value={storeLocation} onChange={(e: any) => setStoreLocation(e.target.value)} />
          </div>
        </div>

        <div className="store-profile-edit__formGrid">
          <div className="store-profile-edit__field">
            <Text variant="p" size="sm" color="black">Amenities</Text>
            <Input type="text" fullWidth value={amenities1} onChange={(e: any) => setAmenities1(e.target.value)} />
            <Input type="text" fullWidth value={amenities2} onChange={(e: any) => setAmenities2(e.target.value)} />
            <Input type="text" fullWidth value={amenities3} onChange={(e: any) => setAmenities3(e.target.value)} />
          </div>
          <div className="store-profile-edit__field">
            <Text variant="p" size="sm" color="black">Parking & Payments</Text>
            <Input type="text" fullWidth value={parking1} onChange={(e: any) => setParking1(e.target.value)} />
            <Input type="text" fullWidth value={payment} onChange={(e: any) => setPayment(e.target.value)} />
          </div>
        </div>

        <div className="store-profile-edit__formGrid">
          <div className="store-profile-edit__field">
            <Text variant="p" size="sm" color="black">Working hours</Text>
            <Input type="text" fullWidth value={hours} onChange={(e: any) => setHours(e.target.value)} />
          </div>
          <div className="store-profile-edit__field">
            <Text variant="p" size="sm" color="black">Contact</Text>
            <Input type="tel" fullWidth value={phone} onChange={(e: any) => setPhone(e.target.value)} />
            <Input type="email" fullWidth value={email} onChange={(e: any) => setEmail(e.target.value)} />
          </div>
        </div>

        {error && (
          <Text variant="p" size="sm" color="black" className="store-profile-edit__error">{error}</Text>
        )}
      </div>
    </div>
  );
};

export default StoreProfileEdit;


