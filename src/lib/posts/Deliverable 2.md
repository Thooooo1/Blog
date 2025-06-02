---
title: 'Deliverable 2'
date: '2025-06-02'
categories:
  - 'Nguyễn Anh Thơ'
  - 'Lương Trung Hiếu'
coverImage: '/images/Apache_CouchDB_logo.svg.png'
coverWidth: 16
coverHeight: 9
---

# Mô tả Use Case – Hệ thống Quản lý Bán hàng

![alt text](./../../images/motausecase.jpg)

## 1. Các Tác Nhân (Actor)

| Actor    | Vai trò                   | Mô tả                                                                                               |
| -------- | ------------------------- | --------------------------------------------------------------------------------------------------- |
| Admin    | Quản trị hệ thống         | Có quyền cao nhất, quản lý toàn bộ thông tin: người dùng, sản phẩm, đơn hàng, thống kê.             |
| Customer | Khách hàng                | Sử dụng hệ thống để duyệt sản phẩm, đặt hàng, xem lịch sử đơn hàng.                                 |
| Guest    | Người dùng chưa đăng nhập | Có thể xem sản phẩm, tìm kiếm sản phẩm, nhưng không thể mua hàng. Không được coi là user định danh. |

---

## 2. Các chức năng chính theo từng Actor

### Admin

- Đăng nhập / Đăng xuất
- Quản lý Người dùng
- Quản lý Sản phẩm
- Quản lý Đơn hàng
- Xem thống kê hệ thống
- Ghi log hệ thống

### Customer

- Đăng ký / Đăng nhập / Đăng xuất
- Xem sản phẩm
- Tìm kiếm sản phẩm
- Thêm vào giỏ hàng
- Tạo đơn hàng
- Xem lịch sử đơn hàng
- Cập nhật thông tin tài khoản

### Guest

- Xem danh sách sản phẩm
- Tìm kiếm sản phẩm

---

## 3. Mối Quan Hệ Tương Tác

| Tương tác                  | Mô tả                                                   |
| -------------------------- | ------------------------------------------------------- |
| Admin ↔ Customer          | Quản lý tài khoản, xử lý đơn hàng                       |
| Admin ↔ Sản phẩm/Đơn hàng | Quản lý dữ liệu, cập nhật số lượng tồn kho, xem báo cáo |
| Customer ↔ Sản phẩm       | Duyệt, tìm kiếm, thêm vào giỏ, đặt mua                  |
| Guest ↔ Sản phẩm          | Xem danh sách, tìm kiếm – không tạo đơn hàng            |

---

## 4. Luồng Hoạt Động Minh Họa

1. Customer đăng ký → đăng nhập vào hệ thống.
2. Duyệt sản phẩm → thêm vào giỏ hàng → tạo đơn hàng.
3. Admin duyệt đơn → cập nhật trạng thái đơn hàng.
4. Customer theo dõi tiến trình đơn hàng → nhận thông báo hoàn tất.
5. Admin xem thống kê → xử lý các sự cố nếu có.

---

# Mô tả chi tiết các thành phần

---

## 1. Giao diện người dùng (UI)

- Thiết kế bằng HTML + CSS (có thể dùng Bootstrap).
- Giao diện chia theo vai trò: Admin, Customer, Guest.
- Có thanh điều hướng, trang sản phẩm, giỏ hàng, quản trị.

---

## 2. Web Server (Node.js + Express)

- Là backend chính, xử lý logic nghiệp vụ, routing, xác thực người dùng.
- Phân quyền truy cập theo vai trò (middleware kiểm tra JWT).
- Quản lý phiên đăng nhập thông qua JWT.

---

## 3. RESTful API Layer

- Định nghĩa đầy đủ các route theo tài nguyên:
  - GET /api/products
  - POST /api/orders
  - POST /api/auth/register / login
- Giao tiếp JSON giữa frontend ↔ backend.

---

## 4. Cơ sở dữ liệu CouchDB

- Hệ quản trị NoSQL hỗ trợ replication, partition.
- Dữ liệu lưu dưới dạng JSON: đơn giản, linh hoạt.
- Sử dụng \_id, \_rev để kiểm soát phiên bản tài liệu.
- Có thể scale và backup qua replication.

---

## 5. Sharding / Replication

- Replication: CouchDB tự động sao chép dữ liệu theo cluster cấu hình.
- Sharding (mở rộng): Có thể thiết lập phân vùng theo database hoặc \_id.

---

## 6. Giao thức giao tiếp

- Frontend ↔ Backend: HTTP (RESTful API), JSON.
- Backend ↔ CouchDB: HTTP request nội bộ (thông qua thư viện HTTP client như Axios/Node-fetch).

---

## 7. File Storage

- Lưu trữ cục bộ các file log, ảnh sản phẩm nếu cần.
- Có thể tích hợp cloud storage như AWS S3 nếu mở rộng.

---

## 8. Logging

- Ghi log request thông qua thư viện morgan.
- Ghi lỗi và hoạt động tại: logs/app.log.
- Có thể mở rộng gửi log về ELK, Sentry.

---

# ⚙️ Công nghệ và thư viện sử dụng

| Công nghệ / Thư viện | Mục đích sử dụng       | Lý do chọn                                       |
| -------------------- | ---------------------- | ------------------------------------------------ |
| Node.js              | Backend                | Hiệu năng tốt, không chặn I/O                    |
| Express.js           | Web Framework          | Nhẹ, dễ sử dụng, phổ biến trong Node             |
| CouchDB              | Cơ sở dữ liệu phân tán | Hỗ trợ RESTful, replication tự động, dễ tích hợp |
| JWT (jsonwebtoken)   | Xác thực               | Stateless, bảo mật                               |
| bcrypt               | Mã hóa mật khẩu        | Mã hóa 1 chiều an toàn                           |
| Morgan               | Ghi log HTTP           | Nhẹ, tích hợp đơn giản                           |
| Bootstrap            | Giao diện              | Responsive, dễ thiết kế giao diện người dùng     |

---

# 🗃 Mô hình dữ liệu (Database Model)

| Collection | Thuộc tính chính                         | Mô tả                           |
| ---------- | ---------------------------------------- | ------------------------------- |
| users      | \_id, username, password, role           | Quản lý người dùng theo vai trò |
| products   | \_id, name, description, price, stock    | Danh sách sản phẩm              |
| orders     | \_id, userId, items, total, status, date | Quản lý đơn hàng                |
| logs       | timestamp, route, method, status, ip     | Ghi log hoạt động               |

---

# Chiến lược triển khai & cấu hình hệ thống

---

## Môi trường phát triển

- Chạy Express bằng node server.js hoặc dùng nodemon để reload khi dev.
- CouchDB khởi chạy trên localhost:5984, có thể cấu hình auth cơ bản.

---

## Triển khai thực tế

- Deploy Express server trên máy chủ (hoặc VPS).
- CouchDB triển khai riêng biệt (docker hoặc native).
- Reverse proxy qua nginx để xử lý HTTPS và load balancing (nếu mở rộng).

---

## Bảo mật và cấu hình

- JWT cho toàn bộ route cần xác thực.
- Mật khẩu người dùng được mã hóa bằng bcrypt.
- Không commit .env lên GitHub.
- Có thể cấu hình HTTPS cho Express/nginx.

---

# ✅ Kết luận

Hệ thống Web quản lý bán hàng xây dựng bằng Node.js, Express, CouchDB đáp ứng các yêu cầu quan trọng của một hệ thống hiện đại:

- Thiết kế RESTful, dễ mở rộng, rõ ràng.
- CSDL CouchDB hỗ trợ replication, phù hợp mô hình phân tán.
- Bảo mật tốt qua JWT, bcrypt, middleware role-based.
- Có thể triển khai thực tế hoặc nâng cấp lên microservice/dockers.

---
