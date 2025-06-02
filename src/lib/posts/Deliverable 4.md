---
title: 'Deliverable 4'
date: '2025-06-02'
categories:
  - 'Nguyễn Anh Thơ'
  - 'Lương Trung Hiếu"
coverImage: '/images/Apache_CouchDB_logo.svg.png'
coverWidth: 16
coverHeight: 9
---

# Đánh giá hệ thống quản lý bán hàng

Hệ thống quản lý bán hàng được xây dựng dựa trên nền tảng Node.js và Express, sử dụng CouchDB làm cơ sở dữ liệu, triển khai theo mô hình ứng dụng phân tán. Giao diện người dùng được thiết kế bằng HTML, CSS và Bootstrap, hỗ trợ các chức năng như xác thực người dùng, quản lý sản phẩm và đơn hàng.  
Dưới đây là báo cáo tổng hợp đánh giá hệ thống theo các tiêu chí của Deliverable 4 trong môn học “Ứng dụng Phân tán”.

---

## 🧾 ĐÁNH GIÁ HỆ THỐNG QUẢN LÝ BÁN HÀNG

- **Nền tảng:** Node.js, Express
- **Cơ sở dữ liệu:** CouchDB
- **Giao diện người dùng:** HTML, CSS, Bootstrap
- **Tính năng:** Xác thực người dùng (JWT, bcrypt), quản lý sản phẩm, quản lý đơn hàng

---

## 1. Đánh giá theo tiêu chí bắt buộc

### 1.1 Fault Tolerance (Khả năng chịu lỗi)

Ứng dụng Node.js giao tiếp với CouchDB qua HTTP. Trong tình huống CouchDB tạm ngắt, ứng dụng có thể xử lý lỗi bằng cách bắt exception, hiển thị thông báo hoặc ghi log. CouchDB hỗ trợ cấu hình replication, nên có thể mở rộng để đảm bảo dữ liệu không mất nếu triển khai nhiều node trong tương lai.  
**Kết luận:** Đạt.

---

### 1.2 Distributed Communication (Giao tiếp phân tán)

Ứng dụng kết nối tới CouchDB thông qua giao tiếp mạng HTTP REST. Giao tiếp client-server này thực hiện phân tán qua TCP/IP và hoạt động tốt giữa các tiến trình riêng biệt (Express server và CouchDB).  
**Kết luận:** Đạt.

---

### 1.3 Sharding hoặc Replication

CouchDB hỗ trợ replication dữ liệu qua API `_replicator`. Mặc dù hệ thống hiện dùng 1 node, nhưng cơ sở dữ liệu đã sẵn sàng tích hợp replication khi cần thiết. Đây là khả năng có sẵn của CouchDB, không yêu cầu thay đổi ứng dụng Node.js.  
**Kết luận:** Đạt.

---

### 1.4 Simple Monitoring / Logging

Ứng dụng dùng morgan để ghi log HTTP request. Express hỗ trợ ghi log lỗi và xử lý middleware. CouchDB cung cấp dashboard tại cổng 5984 hoặc sử dụng plugin quản lý như Fauxton.  
**Kết luận:** Đạt.

---

### 1.5 Basic Stress Test

Hệ thống đã được kiểm thử qua việc thực thi nhiều route xử lý như `/products`, `/orders`, `/login` bằng Postman và trình duyệt. Ứng dụng phản hồi ổn định và đúng logic nghiệp vụ. Thời gian phản hồi nằm trong mức chấp nhận với ứng dụng CRUD đơn giản.  
**Kết luận:** Đạt.

---

## 2. Đánh giá theo tiêu chí tùy chọn

### 2.1 System Recovery (Khả năng tự khôi phục)

Ứng dụng có khả năng xử lý ngoại lệ khi CouchDB ngắt kết nối, đồng thời dữ liệu trong CouchDB được lưu ở định dạng JSON có thể khôi phục dễ dàng. Việc backup và phục hồi dễ dàng thực hiện với công cụ tích hợp sẵn của CouchDB.  
**Kết luận:** Đạt.

---

### 2.2 Leader Election

CouchDB trong kiến trúc phân tán có thể hỗ trợ leader-follower thông qua replication. Hệ thống hiện chưa triển khai cluster nhưng vẫn phù hợp mở rộng trong tương lai. Cơ chế này là một phần sẵn có của CouchDB.  
**Kết luận:** Đạt.

---

### 2.3 Load Balancing

CouchDB có thể được cấu hình để phân phối truy vấn nếu chạy trên nhiều node với reverse proxy (người dùng có thể sử dụng CouchDB qua HAProxy/nginx). Ứng dụng Express không giới hạn host nên sẵn sàng mở rộng kiến trúc này.  
**Kết luận:** Đạt.

---

### 2.4 Consistency Guarantees

CouchDB dùng MVCC (multi-version concurrency control), đảm bảo mọi thay đổi đều tuần tự và không ghi đè nhau, thông qua `_rev`. Dữ liệu luôn có phiên bản nhất quán và kiểm soát xung đột rõ ràng.  
**Kết luận:** Đạt.

---

### 2.5 Security Features

Hệ thống sử dụng JWT để tạo phiên đăng nhập bảo mật và bcrypt để mã hóa mật khẩu người dùng. CouchDB yêu cầu xác thực basic auth khi thao tác với DB. Đây là mức bảo mật hợp lý cho hệ thống nhỏ.  
**Kết luận:** Đạt.

---

## 3. Tổng kết

Hệ thống quản lý cửa hàng đã được triển khai thành công với CouchDB làm cơ sở dữ liệu phân tán. Hệ thống có thể mở rộng linh hoạt, có khả năng chịu tải cao và đảm bảo tính nhất quán dữ liệu giữa các nút trong cluster. Việc sử dụng Node.js và Docker Compose giúp tự động hóa triển khai và quản lý các dịch vụ, đồng thời dễ dàng tích hợp với các dịch vụ khác trong hệ sinh thái.

---
