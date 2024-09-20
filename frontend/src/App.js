import { BrowserRouter, Routes, Route } from "react-router-dom";
// component:
import HeaderComponent from "./components/headerComponent";
import FooterComponent from "./components/footerComponent";

// user component:
// import UserChatComponent from "./pages/components/users/UserChatComponent";
import RoutesWithUSerChatComponent from "./components/users/RoutesWithUSerChatComponent";
// publically available pages:
import HomePage from "./pages/homepage";
import LoginPage from "./pages/loginpage";
import ProductListpage from "./pages/productList";
import RegisterPage from "./pages/registerPage";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/productDetailsPage";

import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
// protected user page:
import UserProfilePage from "./pages/users/UserProfilePage";
import UserOrdersPage from "./pages/users/UserOrdersPage";
import UserOrderDetailsPage from "./pages/users/UserOrderDetail";
import CartPageDetails from "./pages/users/CartPageDetails";
// protected admin page:
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminChatsPage from "./pages/admin/AdminChatsPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminOrderDetailPage from "./pages/admin/adminOrderDetailPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminUserPage from "./pages/admin/AdminUserPage";

import ScrollToTop from "./utils/scrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderComponent />
      <Routes>
        <Route element={<RoutesWithUSerChatComponent />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product-list" element={<ProductListpage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product-details/:id" element={<ProductDetailsPage />} />
          <Route path="*" element="this page is not exist 404" />
        </Route>
        {/* users */}
        <Route element={<ProtectedRoutesComponent admin={false} />}>
          <Route path="/user" element={<UserProfilePage />} />
          <Route path="/user/my-orders" element={<UserOrdersPage />} />
          <Route path="/user/cart" element={<CartPageDetails />} />
          <Route
            path="/user/order-details/:id"
            element={<UserOrderDetailsPage />}
          />
        </Route>
        {/* admin protected routes */}
        <Route element={<ProtectedRoutesComponent admin={true} />}>
          <Route path="/admin/user" element={<AdminUserPage />} />
          <Route path="/admin/edit-user" element={<AdminEditUserPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route
            path="/admin/create-new-product"
            element={<AdminCreateProductPage />}
          />
          <Route
            path="/admin/edit-product"
            element={<AdminEditProductPage />}
          />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route
            path="/admin/order-details/:id"
            element={<AdminOrderDetailPage />}
          />
          <Route path="/admin/chats" element={<AdminChatsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
