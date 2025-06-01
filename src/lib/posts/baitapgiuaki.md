---
title: 'Bài tập giữa kì số 1'
date: '2025-04-29'
categories:
  - 'Nguyễn Anh Thơ'
  - '22010416'
coverImage: '/images/Apache_CouchDB_logo.svg.png'
coverWidth: 16
coverHeight: 9
---

# Báo cáo giữa kỳ – Tìm hiểu CouchDB và ứng dụng

## 1. Mục đích của CouchDB, điểm mạnh – điểm yếu, so sánh và ứng dụng

### Mục đích

CouchDB là một hệ cơ sở dữ liệu NoSQL mã nguồn mở, được thiết kế để lưu trữ dữ liệu dạng tài liệu (JSON) với khả năng đồng bộ hóa mạnh mẽ giữa nhiều thiết bị. Nó phù hợp cho các ứng dụng offline-first – tức là hoạt động tốt ngay cả khi không có kết nối mạng, và tự động đồng bộ khi có mạng trở lại.

### Vấn đề giải quyết được

- Quản lý dữ liệu không có cấu trúc cố định.
- Đồng bộ dữ liệu giữa nhiều thiết bị hoặc người dùng.
- Làm việc hiệu quả trong môi trường thiếu ổn định về mạng.
- Xử lý xung đột dữ liệu khi có nhiều người dùng chỉnh sửa cùng lúc.

### Điểm mạnh

- Hỗ trợ đồng bộ dữ liệu giữa client và server thông qua replication.
- API đơn giản dựa trên REST, dễ tích hợp với ứng dụng web và mobile.
- Dữ liệu linh hoạt, không cần schema.
- Hỗ trợ làm việc offline thông qua PouchDB (trên client).

### Điểm yếu

- Truy vấn dữ liệu không trực quan như SQL, cần dùng MapReduce.
- Khó mở rộng cho các truy vấn phức tạp hoặc xử lý dữ liệu quy mô lớn.
- Cộng đồng hỗ trợ nhỏ hơn so với các hệ quản trị CSDL phổ biến khác.

### So sánh với các hệ thống khác

- So với **MongoDB**, CouchDB có lợi thế về đồng bộ dữ liệu offline giữa client và server.
- So với **Firebase**, CouchDB cho phép kiểm soát chi tiết hơn về dữ liệu và replication nhưng không có tính năng real-time.
- So với **PostgreSQL**, CouchDB không có truy vấn SQL nhưng linh hoạt hơn trong quản lý dữ liệu phi cấu trúc và khả năng mở rộng theo chiều ngang.

### Ứng dụng thực tế

CouchDB phù hợp với các ứng dụng như:

- Quản lý công việc offline.
- Hệ thống bán hàng di động.
- Lưu trữ dữ liệu trên thiết bị IoT.
- Y tế từ xa, giáo dục ở vùng sâu vùng xa.

---

## 2. Đề xuất đề tài giữa kỳ

### Tên đề tài

**Xây dựng hệ thống quản lý bán hàng offline sử dụng CouchDB**

### Vấn đề cần giải quyết

Trong các cửa hàng nhỏ hoặc các đơn vị kinh doanh lưu động (như bán hàng hội chợ, xe tải bán hàng), đôi khi không có kết nối mạng liên tục. Hệ thống bán hàng cần có khả năng:

- Lưu trữ đơn hàng, thông tin sản phẩm, khách hàng ngay cả khi offline.
- Tự động đồng bộ dữ liệu lên server khi có kết nối mạng trở lại.
- Hạn chế lỗi do mất kết nối hoặc nhập liệu lặp lại.
- Hỗ trợ nhiều người dùng bán hàng tại các điểm khác nhau.

### Vai trò của CouchDB

- Sử dụng PouchDB lưu dữ liệu cục bộ trên thiết bị (máy tính bảng, điện thoại).
- Đồng bộ hóa với CouchDB server khi có kết nối mạng.
- Quản lý xung đột và hợp nhất dữ liệu một cách tự động.
- Cung cấp REST API để tích hợp với các ứng dụng quản lý kho, kế toán.

## kết luận
