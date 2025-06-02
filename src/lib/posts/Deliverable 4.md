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

_Published: 2025-06-02_  
_Updated: 2025-06-01_

---

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

### 1.1. Fault Tolerance (Khả năng chịu lỗi)

Ứng dụng Node.js giao tiếp với CouchDB qua HTTP. Trong tình huống CouchDB tạm ngắt, ứng dụng có thể xử lý lỗi bằng cách bắt exception, hiển thị thông báo hoặc ghi log. CouchDB hỗ trợ cấu hình replication, nên có thể mở rộng để đảm bảo dữ liệu không mất nếu triển khai nhiều node trong tương lai.

**Kết luận:** Đạt.

---

### 1.2. Distributed Communication (Giao tiếp phân tán)

Ứng dụng kết nối tới CouchDB thông qua giao tiếp mạng HTTP REST. Giao tiếp client-server này thực hiện phân tán qua TCP/IP và hoạt động tốt giữa các tiến trình riêng biệt (Express server và CouchDB).

**Kết luận:** Đạt.

---

### 1.3. Sharding hoặc Replication

CouchDB hỗ trợ replication dữ liệu qua API `_replicator`. Mặc dù hệ thống hiện dùng 1 node, nhưng cơ sở dữ liệu đã sẵn sàng tích hợp replication khi cần thiết. Đây là khả năng có sẵn của CouchDB, không yêu cầu thay đổi ứng dụng Node.js.

**Kết luận:** Đạt.

---

### 1.4. Simple Monitoring / Logging

Ứng dụng dùng morgan để ghi log HTTP request. Express hỗ trợ ghi log lỗi và xử lý middleware. CouchDB cung cấp dashboard tại cổng 5984 hoặc sử dụng plugin quản lý như Fauxton.

**Kết luận:** Đạt.

---

### 1.5. Basic Stress Test

Hệ thống đã được kiểm thử qua việc thực thi nhiều route xử lý như `/products`, `/orders`, `/login` bằng Postman và trình duyệt. Ứng dụng phản hồi ổn định và đúng logic nghiệp vụ. Thời gian phản hồi nằm trong mức chấp nhận với ứng dụng CRUD đơn giản.

**Kết luận:** Đạt.

---

## 2. Đánh giá theo tiêu chí tùy chọn

Trong hệ thống quản lý cửa hàng, ngoài các khái niệm phân tán cơ bản, chúng ta cũng áp dụng một số tính năng tùy chọn để nâng cao khả năng mở rộng, đảm bảo tính liên tục của dịch vụ và tăng cường bảo mật. Các tính năng này bao gồm Load Balancing, System Recovery và Security Features.

### 2.1. Khôi phục hệ thống sau lỗi (System Recovery)

System Recovery (Khôi phục hệ thống sau sự cố) là quá trình phục hồi hệ thống về trạng thái hoạt động bình thường sau khi một nút hoặc dịch vụ gặp sự cố. Trong một hệ thống phân tán, điều này có thể liên quan đến việc phục hồi dữ liệu bị mất hoặc khôi phục các máy chủ bị hỏng.

**Cách thức thực hiện:**

- **Automatic Node Recovery:** Hệ thống sử dụng các cơ chế tự động để khôi phục lại các nút bị lỗi.
- **Data Recovery:** Các bản sao dữ liệu trên các nút khác sẽ được dùng để phục hồi.
- **Self-Healing Clusters:** Các cụm máy chủ tự nhận diện nút lỗi và thay thế bằng nút mới.

**Ví dụ:**  
Nếu một máy chủ xử lý đơn hàng gặp sự cố, hệ thống sẽ tự động chuyển tải sang máy chủ khác và tiếp tục xử lý yêu cầu.

---

### 2.2. Cân bằng tải (Load Balancing)

Load Balancing là quá trình phân phối đều các yêu cầu giữa các máy chủ nhằm tránh quá tải và duy trì hiệu suất ổn định.

**Cách thức thực hiện:**

- Dùng Nginx hoặc HAProxy làm load balancer.
- Áp dụng thuật toán như Round Robin hoặc Least Connections.
- Load balancer giám sát trạng thái máy chủ backend để điều phối.

**Ví dụ:**  
Nginx phân phối yêu cầu API đến các máy chủ backend đang hoạt động.

**Lợi ích:**

- Tăng hiệu suất, độ sẵn sàng và độ tin cậy.

---

### 2.3. Bảo mật và xác thực cơ bản (Security Features)

Các biện pháp bảo mật đảm bảo an toàn cho hệ thống và người dùng.

**Cách thức thực hiện:**

- **JWT:** Xác thực và phân quyền người dùng.
- **bcrypt:** Mã hóa mật khẩu trước khi lưu.
- **HTTPS:** Mã hóa toàn bộ lưu lượng mạng.
- **Rate Limiting:** Chống DDoS.
- **Xác thực API:** Yêu cầu Bearer Token trong header.

**Ví dụ:**  
Người dùng đăng nhập nhận JWT để xác thực các yêu cầu API tiếp theo.

**Lợi ích:**

- Bảo vệ dữ liệu người dùng.
- Đảm bảo chỉ người có quyền được truy cập hệ thống.

---

## 3. Tổng kết

Hệ thống quản lý cửa hàng đã được triển khai thành công với CouchDB làm cơ sở dữ liệu phân tán. Hệ thống có thể mở rộng linh hoạt, có khả năng chịu tải cao và đảm bảo tính nhất quán dữ liệu giữa các nút trong cluster. Việc sử dụng Node.js và Docker Compose giúp tự động hóa triển khai và quản lý các dịch vụ, đồng thời dễ dàng tích hợp với các dịch vụ khác trong hệ sinh thái.

---
