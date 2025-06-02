---
title: 'Deliverable 3'
date: '2025-06-02'
categories:
  - 'Nguyễn Anh Thơ'
  - 'Lương Trung Hiếu'
coverImage: '/images/Apache_CouchDB_logo.svg.png'
coverWidth: 16
coverHeight: 9
---

## 1. Tóm tắt tiến độ dự án

Dự án quản lý bán hàng đã đạt được nhiều cột mốc quan trọng trong quá trình phát triển. Dưới đây là tổng kết tiến độ hiện tại:

**Các tính năng chính đã được triển khai:**

- Thiết lập cụm cơ sở dữ liệu phân tán CouchDB Cluster và cấu hình kết nối với hệ thống backend Node.js.
- Xây dựng mô hình dữ liệu đầy đủ cho hệ thống bán hàng (bao gồm người dùng, sản phẩm, đơn hàng).
- Tạo RESTful API bằng Node.js và Express để xử lý các yêu cầu từ client.
- Phát triển giao diện người dùng (Web/Mobile) cho cả admin và người dùng, bao gồm các chức năng đăng nhập, đăng ký, xem sản phẩm, đặt hàng, quản lý sản phẩm.
- Tích hợp JWT và bcrypt để đảm bảo bảo mật trong xác thực và quản lý người dùng.
- Sử dụng Nginx hoặc HAProxy làm load balancer để đảm bảo khả năng mở rộng.
- Quản lý tiến trình Node.js bằng PM2 và tự động khởi động lại khi có sự cố.
- Triển khai Docker & Docker Compose để tự động hóa môi trường triển khai.
- Tích hợp Winston để logging và giám sát hoạt động hệ thống.

**Những phần đã hoàn thành:**

- Khởi tạo CouchDB, tạo các bảng (users, products, orders) và cấu hình replication, sharding.
- Tạo giao diện người dùng cho cả admin (quản lý sản phẩm, người dùng, đơn hàng) và user (đăng nhập, đăng ký, xem sản phẩm, tạo đơn hàng).
- Xây dựng API backend hoàn chỉnh cho các chức năng: đăng nhập, đăng ký, CRUD sản phẩm, quản lý đơn hàng, phân quyền người dùng.
- Đảm bảo các API hoạt động ổn định và tương tác hiệu quả với cơ sở dữ liệu.

**Những phần đang được phát triển:**

- Cải thiện UX/UI trên các nền tảng Web và Mobile.
- Thêm xác thực JWT cho API công khai để tăng tính bảo mật.
- Tích hợp Prometheus và Grafana để giám sát hệ thống backend và cơ sở dữ liệu.
- Hoàn thiện CI/CD pipeline để tự động hóa quá trình triển khai và kiểm thử.

**Vấn đề và cách giải quyết:**

- **Vấn đề:** Một số đặc điểm của CouchDB (NoSQL) không hỗ trợ transaction phức tạp như SQL.
- **Giải pháp:** Thực hiện kiểm soát tính toàn vẹn dữ liệu bằng logic xử lý trên backend Node.js thay vì rely vào foreign keys.
- **Vấn đề:** Lỗi mã hóa trong file cấu hình (ví dụ file .env) gây lỗi khi khởi động backend.
- **Giải pháp:** Viết lại file cấu hình bằng encoding chuẩn UTF-8 và kiểm tra lại quy trình khởi động backend bằng PM2.

---

## 2. Demo hoạt động của hệ thống

Hệ thống đã được kiểm thử thành công với các tính năng chính như:  
✅ Đăng nhập/Đăng ký người dùng  
✅ Quản lý sản phẩm (thêm, sửa, xóa, xem)  
✅ Tạo và quản lý đơn hàng  
✅ Quản lý người dùng (dành cho admin)  
✅ Xuất hóa đơn  
✅ Phân quyền người dùng (admin, user, guest)

**Các ảnh chụp màn hình có thể đính kèm:**

- Giao diện quản lý sản phẩm
- Giao diện tạo đơn hàng
- Giao diện quản lý người dùng
- Sơ đồ kiến trúc tổng thể (Client – Backend – CouchDB – Load Balancer)

---

## 3. Mã nguồn (Code Snippets)

**API tạo đơn hàng (Node.js + Express + CouchDB)**  
![API Order Creation](image_api_order.png)

**Xác thực JWT cho API (Node.js + Express)**  
![JWT Authentication](image_jwt_auth.png)

**Giao diện React: Tạo đơn hàng (Web Client)**  
![Order Form UI](image_order_ui.png)

---

## 4. Danh sách tính năng đã hoàn thành

**Các tính năng chính đã hoàn thành:**  
✅ Xây dựng Backend API bằng Node.js, Express:

- Đăng ký, đăng nhập, xác thực JWT.
- API quản lý người dùng (CRUD).
- API quản lý sản phẩm (CRUD).
- API quản lý đơn hàng (tạo, cập nhật, xem chi tiết).  
  ✅ Cơ sở dữ liệu phân tán CouchDB:
- Cấu hình cluster CouchDB (replication, sharding).
- Lưu trữ dữ liệu người dùng, sản phẩm, đơn hàng dưới dạng JSON documents.
- Tối ưu chỉ mục với Mango Query.  
  ✅ Giao diện người dùng (React/React Native):
- Giao diện đăng nhập/đăng ký người dùng.
- Danh sách sản phẩm, chi tiết sản phẩm.
- Tính năng thêm sản phẩm vào giỏ hàng.
- Tạo đơn hàng và theo dõi trạng thái.  
  ✅ Bảo mật và xác thực:
- Mã hóa mật khẩu với bcrypt.
- Xác thực JWT cho các API nhạy cảm.  
  ✅ Tự động hóa và giám sát:
- Sử dụng PM2 để quản lý tiến trình Node.js.
- Docker và Docker Compose để triển khai.
- Ghi log bằng Winston, chuẩn bị tích hợp ELK Stack hoặc Sentry.

---

## 5. Kế hoạch tiếp theo

Để hoàn thiện hệ thống quản lý bán hàng và chuẩn bị cho triển khai thực tế, các bước tiếp theo bao gồm:

**Các mục tiêu sắp tới:**  
✅ **Tối ưu hóa giao diện người dùng (Web/Mobile):**

- Cải thiện trải nghiệm người dùng (UX/UI) cho cả admin và khách hàng cuối.
- Bổ sung tính năng thông báo trực tiếp khi có đơn hàng mới, trạng thái đơn hàng thay đổi, hoặc khuyến mãi.
- Đảm bảo giao diện tương thích trên đa nền tảng (desktop, tablet, mobile).

✅ **Tự động hóa triển khai:**

- Tích hợp CI/CD thông qua GitHub Actions hoặc GitLab CI/CD để tự động hóa build, test, và deploy.
- Sử dụng Docker Compose và PM2 để quản lý container và tiến trình backend Node.js.
- Tạo pipeline kiểm thử để phát hiện sớm lỗi phát sinh trong quá trình phát triển.

✅ **Tài liệu hướng dẫn sử dụng:**

- Viết tài liệu chi tiết dành cho admin (quản lý sản phẩm, người dùng, đơn hàng) và người dùng (đăng ký, mua hàng, theo dõi đơn).
- Bao gồm hướng dẫn cấu hình CouchDB cluster (tạo database, replication, sharding) và hướng dẫn sử dụng API backend.

**Các vấn đề cần giải quyết:**  
 **Bảo mật dữ liệu:**

- Kích hoạt chế độ CouchDB secure mode để mã hóa dữ liệu truyền tải giữa các node và giữa client-backend.
- Triển khai JWT cho API công khai để đảm bảo chỉ người dùng đã xác thực mới có quyền truy cập các chức năng nhạy cảm.
- Tích hợp bcrypt để mã hóa mật khẩu người dùng trước khi lưu trữ.

  **Hiệu năng hệ thống:**

- Thực hiện kiểm tra tải (stress test) để đánh giá khả năng xử lý của hệ thống với số lượng bản ghi và yêu cầu lớn.
- Tối ưu hóa truy vấn với CouchDB Mango Queries và thiết lập chỉ mục phù hợp để tăng tốc độ phản hồi.
- Tinh chỉnh load balancer (Nginx/HAProxy) để tối ưu phân phối tải và giảm thiểu độ trễ.

  **Logging & Monitoring:**

- Tích hợp hệ thống ghi log chi tiết bằng Winston kết hợp với ELK Stack (Elasticsearch, Logstash, Kibana) hoặc Sentry để giám sát và xử lý lỗi.
- Cài đặt Prometheus và Grafana để giám sát tình trạng server, tiến trình Node.js, và cụm CouchDB theo thời gian thực.
- Tạo cảnh báo tự động (alert) khi phát hiện bất thường trong hệ thống.
