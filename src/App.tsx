import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import {
  Login,
  Register,
  HomeScreen,
  StoreScreen,
  StoreDetailScreen,
  LocationScreen,
  UserProfileScreen,
  AboutScreen,
  BlogScreen,
  BlogDetailScreen,
  ContactScreen,
  PromotionScreen,
} from "./screens";
import {
  AdminLayout, AdminLogin, AdminDashboard, StoresManage, StoreDetailManage, UserManage, UserDetailManage, BlogsManage, BlogDetailManage, BlogCreate, SubService, BannerManage, BannerAdd, ContentManage, ServiceManage, ClientManage, PayManage, ParkingManage, AmenitiesManage, ServiceAdd, MenuManage, MenuAdd, CategoryManage, CategoryAdd, ReviewManage, ReviewView, PromotionManage, PromotionAdd, AdminProfile, ShopProfile, StoreProfileEdit
} from "./screens/admin";
import { ThemeProvider, Header, AuthProvider, LoadingProvider, AdminRouteGuard } from "./components";
import "./App.css";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <LoadingProvider>
          <ThemeProvider>
            <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/*" element={
                <>
                  <Header />
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/store" element={<StoreScreen />} />
                    <Route path="/store/:id" element={<StoreDetailScreen />} />
                    <Route path="/location" element={<LocationScreen />} />
                    <Route path="/profile" element={<UserProfileScreen />} />
                    <Route path="/about" element={<AboutScreen />} />
                    <Route path="/blog" element={<BlogScreen />} />
                    <Route path="/blog/:id" element={<BlogDetailScreen />} />
                    <Route path="/contact" element={<ContactScreen />} />
                    <Route path="/promotion" element={<PromotionScreen />} />
                    <Route path="*" element={<HomeScreen />} />
                  </Routes>
                </>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="login" element={<AdminLogin />} />
                <Route path="dashboard" element={
                  <AdminRouteGuard>
                    <AdminDashboard />
                  </AdminRouteGuard>
                } />
                <Route path="stores" element={
                  <AdminRouteGuard>
                    <StoresManage />
                  </AdminRouteGuard>
                } />
                <Route path="stores/:id" element={
                  <AdminRouteGuard>
                    <StoreDetailManage />
                  </AdminRouteGuard>
                } />
                <Route path="users" element={
                  <AdminRouteGuard>
                    <UserManage />
                  </AdminRouteGuard>
                } />
                <Route path="users/:id" element={
                  <AdminRouteGuard>
                    <UserDetailManage />
                  </AdminRouteGuard>
                } />
                <Route path="blogs" element={
                  <AdminRouteGuard>
                    <BlogsManage />
                  </AdminRouteGuard>
                } />
                <Route path="blogs/new" element={
                  <AdminRouteGuard>
                    <BlogCreate />
                  </AdminRouteGuard>
                } />
                <Route path="blogs/new/:id" element={
                  <AdminRouteGuard>
                    <BlogCreate />
                  </AdminRouteGuard>
                } />
                <Route path="blogs/:id" element={
                  <AdminRouteGuard>
                    <BlogDetailManage />
                  </AdminRouteGuard>
                } />
                <Route path="introductions/:serviceId" element={
                  <AdminRouteGuard>
                    <SubService />
                  </AdminRouteGuard>
                } />
                <Route path="introductions/service/manage" element={
                  <AdminRouteGuard>
                    <ServiceManage />
                  </AdminRouteGuard>
                } />
                <Route path="introductions/client/manage" element={
                  <AdminRouteGuard>
                    <ClientManage />
                  </AdminRouteGuard>
                } />
                <Route path="introductions/pay/manage" element={
                  <AdminRouteGuard>
                    <PayManage />
                  </AdminRouteGuard>
                } />
                <Route path="introductions/parking/manage" element={
                  <AdminRouteGuard>
                    <ParkingManage />
                  </AdminRouteGuard>
                } />
                <Route path="introductions/amenities/manage" element={
                  <AdminRouteGuard>
                    <AmenitiesManage />
                  </AdminRouteGuard>
                } />
                <Route path="introductions/:serviceType/new" element={
                  <AdminRouteGuard>
                    <ServiceAdd />
                  </AdminRouteGuard>
                } />
                <Route path="store/menu/manage" element={
                  <AdminRouteGuard>
                    <MenuManage />
                  </AdminRouteGuard>
                } />
                <Route path="store/menu/new" element={
                  <AdminRouteGuard>
                    <MenuAdd />
                  </AdminRouteGuard>
                } />
                <Route path="store/category/manage" element={
                  <AdminRouteGuard>
                    <CategoryManage />
                  </AdminRouteGuard>
                } />
                <Route path="store/category/new" element={
                  <AdminRouteGuard>
                    <CategoryAdd />
                  </AdminRouteGuard>
                } />
                <Route path="store/review/manage" element={
                  <AdminRouteGuard>
                    <ReviewManage />
                  </AdminRouteGuard>
                } />
                <Route path="store/review/:id" element={
                  <AdminRouteGuard>
                    <ReviewView />
                  </AdminRouteGuard>
                } />
                <Route path="store/promotion/manage" element={
                  <AdminRouteGuard>
                    <PromotionManage />
                  </AdminRouteGuard>
                } />
                <Route path="store/promotion/new" element={
                  <AdminRouteGuard>
                    <PromotionAdd />
                  </AdminRouteGuard>
                } />
                <Route path="profile-shop" element={
                  <AdminRouteGuard>
                    <ShopProfile />
                  </AdminRouteGuard>
                } />
                <Route path="store/profile/edit" element={
                  <AdminRouteGuard>
                    <StoreProfileEdit />
                  </AdminRouteGuard>
                } />
                <Route path="profile" element={
                  <AdminRouteGuard>
                    <AdminProfile />
                  </AdminRouteGuard>
                } />
                <Route path="banners" element={
                  <AdminRouteGuard>
                    <BannerManage />
                  </AdminRouteGuard>
                } />
                <Route path="banners/new" element={
                  <AdminRouteGuard>
                    <BannerAdd />
                  </AdminRouteGuard>
                } />
                <Route path="banners/new/:id" element={
                  <AdminRouteGuard>
                    <BannerAdd />
                  </AdminRouteGuard>
                } />
                <Route path="content" element={
                  <AdminRouteGuard>
                    <ContentManage />
                  </AdminRouteGuard>
                } />
                <Route path="" element={<AdminLogin />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
        </LoadingProvider>
      </AuthProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </MantineProvider>
  );
}

export default App;
