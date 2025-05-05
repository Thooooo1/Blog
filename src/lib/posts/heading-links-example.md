---
title: 'Tổng quan về hệ thống phân tán'
date: '2025-04-29'
categories:
  - 'sveltekit'
  - 'markdown'
coverImage: '/static/images/ảnh máy.jpg'
coverWidth: 16
coverHeight: 9
---

## 1. Giới thiệu về Lenovo Yoga Slim 7i Pro

Lenovo Yoga Slim 7i Pro là một dòng laptop cao cấp thuộc phân khúc siêu mỏng nhẹ (ultrabook), được thiết kế dành cho người dùng chuyên nghiệp, sáng tạo nội dung và học tập – những người cần một thiết bị vừa mạnh mẽ, vừa di động.
Hiệu năng máy tính:

CPU: Tên chip (ví dụ: Intel Core i7-1165G7, i5-1240P…)

GPU: Thường là Intel Iris Xe, hoặc có thể là NVIDIA GeForce MX450 nếu bản cao cấp

RAM: Tổng dung lượng RAM (8GB, 16GB…), tốc độ (MHz)

---

## 2. Liệt kê ít nhất 12 bài toán trong CNTT dùng đa luồng / đa tiến trình

- Web Server xử lý nhiều yêu cầu đồng thời: mỗi yêu cầu từ người dùng được xử lý bằng một luồng hoặc tiến trình riêng biệt để tăng khả năng phục vụ đồng thời.

- Tải nhiều tệp cùng lúc (multi-download): mỗi tệp được tải xuống bằng một luồng khác nhau để rút ngắn tổng thời gian chờ.

- Trình duyệt web (như Chrome): sử dụng đa tiến trình, mỗi tab hoạt động như một tiến trình riêng biệt để tránh treo toàn bộ trình duyệt khi một tab gặp lỗi.

- Trò chơi điện tử (Game engine): sử dụng đa luồng để tách riêng các phần như xử lý hình ảnh, âm thanh, mạng, và AI nhằm tăng hiệu năng.

- Xử lý ảnh hoặc video (rendering, chuyển định dạng): chia nhỏ dữ liệu và xử lý song song bằng nhiều luồng để đẩy nhanh tốc độ xử lý.

- Phân tích dữ liệu lớn (Big Data): sử dụng nhiều tiến trình hoặc hệ thống phân tán để xử lý dữ liệu trên nhiều lõi CPU hoặc nhiều máy tính.

- Biên dịch chương trình lớn (compile project): mỗi tệp mã nguồn có thể được biên dịch bởi một tiến trình độc lập để rút ngắn thời gian build.

- Phần mềm diệt virus quét toàn bộ hệ thống: chia từng ổ đĩa, thư mục, hoặc tệp thành các tác vụ riêng xử lý song song.

- Phát nhạc hoặc xem video trực tuyến: sử dụng đa luồng để vừa tải dữ liệu, vừa giải mã và hiển thị đồng thời.

- Ứng dụng mạng xã hội (xử lý feed, tin nhắn, upload ảnh): nhiều luồng thực hiện các chức năng khác nhau để đảm bảo tốc độ và độ phản hồi.

- Máy ảo (Virtual Machine) hoặc giả lập hệ điều hành: mỗi hệ điều hành giả lập chạy như một tiến trình độc lập.

- Huấn luyện mô hình AI, học sâu (Deep Learning): sử dụng cả đa luồng, đa tiến trình, và hệ thống phân tán để tận dụng tối đa tài nguyên tính toán.

---

## 3. Các khái niệm chính của hệ thống phân tán

### 3.1 Giải thích các thuật ngữ

- **Scalability**: Khả năng mở rộng hệ thống để xử lý nhiều tải hơn.
- **Fault Tolerance**: Khả năng tiếp tục hoạt động khi một phần hệ thống gặp lỗi.
- **Availability**: Khả năng hệ thống sẵn sàng phục vụ bất kỳ lúc nào.
- **Transparency**: Người dùng không thấy sự phức tạp bên trong (ví dụ: vị trí, lỗi, di chuyển...).
- **Concurrency**: Cho phép nhiều tiến trình hoạt động đồng thời mà không xung đột.
- **Parallelism**: Thực hiện nhiều tác vụ cùng lúc để tối ưu hiệu suất.
- **Openness**: Hệ thống có thể tương thích và tích hợp với các thành phần khác.
- **Vertical Scaling**: Nâng cấp phần cứng cho máy chủ (thêm CPU, RAM).
- **Horizontal Scaling**: Thêm nhiều máy chủ mới vào hệ thống.
- **Load Balancer**: Phân phối tải đều giữa các máy chủ trong hệ thống.
- **Replication**: Sao chép dữ liệu sang nhiều nút để tăng độ tin cậy và hiệu suất.

### 3.2 Ví dụ minh họa

**Ví dụ: Amazon Web Services (AWS)**

- **Scalability**: Cho phép thêm/giảm máy ảo tự động qua auto-scaling group.
- **Fault Tolerance**: Nếu một vùng bị lỗi, vùng khác vẫn hoạt động.
- **Load Balancer**: ELB phân phối lưu lượng truy cập giữa các máy chủ.
- **Replication**: S3 và RDS sử dụng replication để đảm bảo an toàn dữ liệu.
- **Horizontal Scaling**: Thêm nhiều EC2 instance để tăng tải.
- **Transparency**: Người dùng không biết đang truy cập máy chủ nào.

---

## 4. Kiến trúc của hệ thống phân tán

### 4.1 Các mô hình kiến trúc phổ biến

- **Client-Server**: Máy khách gửi yêu cầu, máy chủ xử lý.
- **Peer-to-Peer (P2P)**: Các nút trong mạng bình đẳng, chia sẻ tài nguyên.
- **Multi-tier Architecture (3-tier)**: Gồm frontend, logic trung gian và database.
- **Microservices Architecture**: Hệ thống gồm nhiều dịch vụ nhỏ, độc lập.
- **Service-Oriented Architecture (SOA)**: Các thành phần giao tiếp qua giao thức mạng chuẩn (thường là HTTP, SOAP).

### 4.2 Ví dụ

**Microservices Architecture trong Netflix:**

- Mỗi chức năng (gợi ý, thanh toán, phát video) là một dịch vụ riêng.
- Dễ triển khai độc lập và mở rộng theo nhu cầu.
- Các dịch vụ giao tiếp qua REST hoặc gRPC.

---

Bạn muốn mình chuyển nội dung này thành file `.md` để bạn tải về không?
