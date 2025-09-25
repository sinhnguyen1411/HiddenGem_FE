import React, { useState } from 'react';
import { Footer, Title, Text, Button, Input } from '../../components';
import { contactHero, contactPageInfo, contactFormFields } from '../../dummyData';
import './ContactScreen.css';

interface ContactScreenProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactScreen: React.FC<ContactScreenProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`contact-screen ${className}`}>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero__overlay"></div>
        <div className="contact-hero__content">
          <div className="contact-hero__text">
            <Text className="contact-hero__highlight" color="white">
              {contactHero.subtitle}
            </Text>
            <Title level="h1" size="xl" color="white" className="contact-hero__title">
              {contactHero.title}
            </Title>
          </div>
        </div>
      </section>

      <main className="contact-screen__main">
        <div className="contact-screen__container">
          {/* Contact Information Section */}
          <section className="contact-info-section">
            <div className="contact-info__header">
              <div className="contact-info__line"></div>
              <Title level="h2" size="md" color="primary" className="contact-info__title">
                Contact Information
              </Title>
              <div className="contact-info__line"></div>
            </div>

            <div className="contact-info__grid">
              {/* Main Office */}
              <div className="contact-info-card">
                <div className="contact-info-card__icon">🏢</div>
                <Title level="h3" size="md" color="primary" className="contact-info-card__title">
                  {contactPageInfo.mainOffice.title}
                </Title>
                <div className="contact-info-card__content">
                  <Text variant="p" size="sm" color="secondary" className="contact-info-card__text">
                    {contactPageInfo.mainOffice.address}
                  </Text>
                  <Text variant="p" size="sm" color="secondary" className="contact-info-card__text">
                    {contactPageInfo.mainOffice.city}
                  </Text>
                  <Text variant="p" size="sm" color="secondary" className="contact-info-card__text">
                    📞 {contactPageInfo.mainOffice.phone}
                  </Text>
                  <Text variant="p" size="sm" color="secondary" className="contact-info-card__text">
                    ✉️ {contactPageInfo.mainOffice.email}
                  </Text>
                  <Text variant="p" size="sm" color="secondary" className="contact-info-card__text">
                    🕒 {contactPageInfo.mainOffice.hours}
                  </Text>
                </div>
              </div>

              {/* Customer Support */}
              <div className="contact-info-card">
                <div className="contact-info-card__icon">🎧</div>
                <Title level="h3" size="md" color="primary" className="contact-info-card__title">
                  {contactPageInfo.support.title}
                </Title>
                <div className="contact-info-card__content">
                  <Text variant="p" size="sm" color="secondary" className="contact-info-card__text">
                    📞 {contactPageInfo.support.phone}
                  </Text>
                  <Text variant="p" size="sm" color="secondary" className="contact-info-card__text">
                    ✉️ {contactPageInfo.support.email}
                  </Text>
                  <Text variant="p" size="sm" color="secondary" className="contact-info-card__text">
                    🕒 {contactPageInfo.support.hours}
                  </Text>
                </div>
              </div>

              {/* Business Inquiries */}
              <div className="contact-info-card">
                <div className="contact-info-card__icon">💼</div>
                <Title level="h3" size="md" color="primary" className="contact-info-card__title">
                  {contactPageInfo.business.title}
                </Title>
                <div className="contact-info-card__content">
                  <Text variant="p" size="sm" color="secondary" className="contact-info-card__text">
                    📞 {contactPageInfo.business.phone}
                  </Text>
                  <Text variant="p" size="sm" color="secondary" className="contact-info-card__text">
                    ✉️ {contactPageInfo.business.email}
                  </Text>
                  <Text variant="p" size="sm" color="secondary" className="contact-info-card__text">
                    🕒 {contactPageInfo.business.hours}
                  </Text>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="contact-form-section">
            <div className="contact-form__header">
              <Title level="h2" size="xl" color="primary" className="contact-form__title">
                Send us a Message
              </Title>
              <Text variant="p" size="md" color="secondary" className="contact-form__subtitle">
                Fill out the form below and we'll get back to you as soon as possible.
              </Text>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__grid">
                <div className="contact-form__field">
                  <label htmlFor="name" className="contact-form__label">
                    {contactFormFields.name.label}
                    {contactFormFields.name.required && <span className="contact-form__required">*</span>}
                  </label>
                  <Input
                    type={contactFormFields.name.type as any}
                    name="name"
                    id="name"
                    placeholder={contactFormFields.name.placeholder}
                    value={formData.name}
                    onChange={handleInputChange}
                    required={contactFormFields.name.required}
                    fullWidth
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="email" className="contact-form__label">
                    {contactFormFields.email.label}
                    {contactFormFields.email.required && <span className="contact-form__required">*</span>}
                  </label>
                  <Input
                    type={contactFormFields.email.type as any}
                    name="email"
                    id="email"
                    placeholder={contactFormFields.email.placeholder}
                    value={formData.email}
                    onChange={handleInputChange}
                    required={contactFormFields.email.required}
                    fullWidth
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="phone" className="contact-form__label">
                    {contactFormFields.phone.label}
                    {contactFormFields.phone.required && <span className="contact-form__required">*</span>}
                  </label>
                  <Input
                    type={contactFormFields.phone.type as any}
                    name="phone"
                    id="phone"
                    placeholder={contactFormFields.phone.placeholder}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required={contactFormFields.phone.required}
                    fullWidth
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="subject" className="contact-form__label">
                    {contactFormFields.subject.label}
                    {contactFormFields.subject.required && <span className="contact-form__required">*</span>}
                  </label>
                  <Input
                    type={contactFormFields.subject.type as any}
                    name="subject"
                    id="subject"
                    placeholder={contactFormFields.subject.placeholder}
                    value={formData.subject}
                    onChange={handleInputChange}
                    required={contactFormFields.subject.required}
                    fullWidth
                  />
                </div>
              </div>

              <div className="contact-form__field contact-form__field--full">
                <label htmlFor="message" className="contact-form__label">
                  {contactFormFields.message.label}
                  {contactFormFields.message.required && <span className="contact-form__required">*</span>}
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder={contactFormFields.message.placeholder}
                  value={formData.message}
                  onChange={handleInputChange}
                  required={contactFormFields.message.required}
                  className="contact-form__textarea"
                  rows={6}
                />
              </div>

              {submitStatus === 'success' && (
                <div className="contact-form__success">
                  <Text variant="p" size="sm" color="primary">
                    ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </Text>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="contact-form__error">
                  <Text variant="p" size="sm" color="primary">
                    ❌ Sorry, there was an error sending your message. Please try again.
                  </Text>
                </div>
              )}

              <div className="contact-form__actions">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="contact-form__submit"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </section>


        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactScreen;
