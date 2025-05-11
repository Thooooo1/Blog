---
title: 'Bài tập giữa kì số 11'
date: '2025-04-29'
categories:
  - 'Nguyễn Anh Thơ'
  - '22010416'
coverImage: '/images/Apache_CouchDB_logo.svg.png'
coverWidth: 16
coverHeight: 9
---

# Báo cáo giữa kỳ: Tìm hiểu về CouchDB

## 1. Mục đích của CouchDB, vấn đề giải quyết, điểm mạnh – yếu, so sánh và ứng dụng

### Mục đích của CouchDB

CouchDB là một hệ quản trị cơ sở dữ liệu NoSQL dạng **document-oriented**, lưu trữ dữ liệu dưới dạng **JSON documents** và hỗ trợ **MapReduce views** cùng với **RESTful API**. Nó hướng đến việc cung cấp một nền tảng lưu trữ dữ liệu linh hoạt, dễ tích hợp với các ứng dụng phân tán và ngoại tuyến.

### Vấn đề CouchDB giải quyết

- Lưu trữ dữ liệu phi cấu trúc hoặc bán cấu trúc, không cần schema cố định.
- Đồng bộ dữ liệu giữa các thiết bị trong môi trường không ổn định về kết nối (offline-first).
- Hỗ trợ ứng dụng phân tán, cho phép nhiều node hoạt động độc lập và đồng bộ hóa khi có kết nối.
- Quản lý xung đột dữ liệu hiệu quả khi nhiều người dùng cùng cập nhật.

### Điểm mạnh của CouchDB (Chi tiết)

| Điểm mạnh                   | Mô tả chi tiết                                                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Replication mạnh mẽ**     | CouchDB hỗ trợ đồng bộ hóa dữ liệu 2 chiều (bi-directional replication), phù hợp với ứng dụng cần hoạt động offline hoặc trong môi trường có kết nối không ổn định. |
| **Giao diện RESTful API**   | Dễ dàng tích hợp với các ứng dụng web và mobile thông qua các HTTP request (GET, POST, PUT, DELETE).                                                                |
| **Schema-free (linh hoạt)** | Không cần khai báo cấu trúc dữ liệu trước, cho phép dễ dàng thay đổi cấu trúc document khi cần.                                                                     |
| **Fauxton Web UI**          | Giao diện người dùng quản trị hiện đại, thân thiện, dễ sử dụng để kiểm tra, chỉnh sửa và quản lý database.                                                          |
| **Conflict resolution**     | Hệ thống có cơ chế xử lý xung đột (conflict) rõ ràng khi dữ liệu được cập nhật ở nhiều nơi, đảm bảo tính toàn vẹn.                                                  |
| **Clustering**              | CouchDB 2.x trở lên hỗ trợ clustering giúp mở rộng quy mô hệ thống dễ dàng.                                                                                         |

### Điểm yếu của CouchDB (Chi tiết)

| Điểm yếu                                                           | Mô tả chi tiết                                                                                                                  |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **Hiệu năng truy vấn hạn chế**                                     | CouchDB sử dụng MapReduce để truy vấn dữ liệu, điều này linh hoạt nhưng phức tạp và có thể chậm hơn với khối lượng dữ liệu lớn. |
| **Không có truy vấn SQL**                                          | Những ai quen với SQL sẽ cần thời gian để làm quen với cách tạo view và query bằng MapReduce.                                   |
| **Không phù hợp với dữ liệu quan hệ phức tạp**                     | CouchDB không lý tưởng để xử lý các quan hệ phức tạp giữa các bảng như RDBMS (MySQL/PostgreSQL).                                |
| **Thiếu hệ sinh thái so với MongoDB**                              | Các thư viện, tài liệu và cộng đồng của CouchDB nhỏ hơn nên việc học tập và triển khai có thể gặp khó khăn.                     |
| **Không hỗ trợ giao dịch nhiều bảng (multi-document transaction)** | Không giống như cơ sở dữ liệu quan hệ, CouchDB không hỗ trợ transaction kiểu ACID cho nhiều document.                           |

### 🔄 So sánh với các thư viện/framework khác

| Tiêu chí      | **CouchDB** | **MongoDB** | **Firebase Realtime DB** |
| ------------- | ----------- | ----------- | ------------------------ |
| Dữ liệu       | JSON        | BSON        | JSON                     |
| Sync 2 chiều  | ✅          | ❌          | ✅                       |
| Offline-first | ✅          | ⚠️          | ✅                       |
| UI quản trị   | Fauxton     | Compass     | Firebase Console         |
| Cơ chế query  | MapReduce   | Aggregation | REST API                 |

### Ứng dụng thực tế

- Ghi chú cá nhân hoặc ứng dụng bán hàng offline.
- Ứng dụng y tế tại vùng không có Internet.
- Progressive Web App cần lưu dữ liệu cục bộ.
- Hệ thống kiểm tra phiếu khảo sát, phiếu điều tra và đồng bộ khi có kết nối.

---

## 2. Kế hoạch bài giữa kỳ + Blog về CouchDB

### Kế hoạch bài giữa kỳ

**Đề tài**: _Xây dựng ứng dụng ghi chú cá nhân (Personal Notes App) sử dụng CouchDB_

**Mục tiêu**:

- Cài đặt và cấu hình CouchDB.
- Thiết kế giao diện nhập/xem/đồng bộ ghi chú.
- Thiết lập replication (đồng bộ hóa).
- Sử dụng MapReduce tạo báo cáo theo ngày.

**Công nghệ sử dụng**:

- Backend: CouchDB, có thể dùng Express/Node.js nếu cần.
- Frontend: HTML/CSS/JS hoặc React.
- Đồng bộ: local và remote CouchDB.

**Thời gian thực hiện**:

- Tuần 1–2: Cài đặt, viết API mẫu.
- Tuần 3–4: Giao diện và tính năng ghi chú.
- Tuần 5: Đồng bộ và MapReduce.
- Tuần 6: Viết báo cáo và chuẩn bị trình bày.

---

### 🌐 Tạo blog về CouchDB

Blog có thể gồm các nội dung:

- Giới thiệu CouchDB là gì, vì sao chọn.
- Hướng dẫn cài đặt trên Windows/Linux.
- Cách sử dụng Fauxton UI.
- CRUD qua HTTP API.
- Thiết lập replication và phân quyền.
