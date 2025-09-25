// Contact Page Data
export const contactHero = {
  title: "Get in Touch",
  subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  backgroundImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
};

// Contact Information
export const contactPageInfo = {
  mainOffice: {
    title: "Main Office",
    address: "123 Coffee Street, Downtown District",
    city: "New York, NY 10001",
    phone: "(555) 123-4567",
    email: "info@hiddengems.com",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM"
  },
  support: {
    title: "Customer Support",
    phone: "(555) 123-4568",
    email: "support@hiddengems.com",
    hours: "24/7 Online Support"
  },
  business: {
    title: "Business Inquiries",
    phone: "(555) 123-4569",
    email: "business@hiddengems.com",
    hours: "Monday - Friday: 10:00 AM - 5:00 PM"
  }
};

// Contact Form Fields
export const contactFormFields = {
  name: {
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    type: "text"
  },
  email: {
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    type: "email"
  },
  phone: {
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: false,
    type: "tel"
  },
  subject: {
    label: "Subject",
    placeholder: "What's this about?",
    required: true,
    type: "text"
  },
  message: {
    label: "Message",
    placeholder: "Tell us more about your inquiry...",
    required: true,
    type: "textarea"
  }
};

// FAQ Data
export const faqData = [
  {
    id: 1,
    question: "How can I add a new coffee shop to the platform?",
    answer: "You can add a new coffee shop by clicking the 'Add Location' button in your dashboard or by contacting our support team. We'll review and verify the information before publishing."
  },
  {
    id: 2,
    question: "How do I update my coffee shop information?",
    answer: "Log into your account, go to 'My Locations', and click 'Edit' on the coffee shop you want to update. Changes will be reviewed before going live."
  },
  {
    id: 3,
    question: "Can I remove negative reviews from my coffee shop?",
    answer: "We encourage honest reviews. However, if you believe a review violates our community guidelines, you can report it and our team will review it within 24-48 hours."
  },
  {
    id: 4,
    question: "How do I contact a specific coffee shop owner?",
    answer: "Each coffee shop listing includes contact information provided by the owner. You can find phone numbers, email addresses, and social media links on their profile page."
  },
  {
    id: 5,
    question: "Is there a mobile app available?",
    answer: "Yes! Our mobile app is available for both iOS and Android. You can download it from the App Store or Google Play Store."
  },
  {
    id: 6,
    question: "How do I report a technical issue?",
    answer: "Please contact our technical support team at support@hiddengems.com or use the contact form above. Include details about the issue and your device information."
  }
];

// Social Media Links
export const socialMediaLinks = [
  {
    name: "Facebook",
    url: "https://facebook.com/hiddengems",
    icon: "📘",
    color: "var(--color-social-facebook)"
  },
  {
    name: "Instagram",
    url: "https://instagram.com/hiddengems",
    icon: "📷",
    color: "var(--color-social-instagram)"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/hiddengems",
    icon: "🐦",
    color: "var(--color-social-twitter)"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/hiddengems",
    icon: "💼",
    color: "var(--color-social-linkedin)"
  }
];

// Map Configuration
export const contactMapConfig = {
  center: {
    lat: 40.7589,
    lng: -73.9851
  },
  zoom: 15,
  markers: [
    {
      id: 1,
      position: { lat: 40.7589, lng: -73.9851 },
      title: "Main Office",
      address: "123 Coffee Street, Downtown District"
    }
  ]
};
