---
title: 'Trao đổi thông tin'
date: '2025-04-29'
categories:
  - 'sveltekit'
  - 'markdown'
coverImage: '/images/trao đổi thông tin.jpg'
coverWidth: 16
coverHeight: 9
---

# 📘 Báo cáo: Message Broker & RPC trong Python

---

## 📝 Bài 1: Phân biệt Message Broker và RPC Library

### 1. Message Broker

- **Khái niệm:** Là hệ thống trung gian truyền tải thông điệp giữa các dịch vụ, hoạt động theo mô hình **asynchronous** (bất đồng bộ).
- **Đặc điểm:**

  - Thường sử dụng hàng đợi (queue).
  - Tách biệt giữa bên gửi và bên nhận.
  - Ví dụ: RabbitMQ, Apache Kafka, ActiveMQ.

- **Ưu điểm:**

  - Bền vững và linh hoạt.
  - Có thể lưu tin nhắn, hỗ trợ retry, xử lý song song.
  - Dễ dàng mở rộng hệ thống.

- **Hạn chế:**
  - Không có phản hồi trực tiếp.
  - Độ trễ có thể cao hơn RPC.

---

### 2. RPC Library (Remote Procedure Call)

- **Khái niệm:** Cho phép một chương trình gọi hàm từ xa như gọi một hàm nội bộ – hoạt động theo mô hình **synchronous** (đồng bộ).

- **Ưu điểm:**

  - Gọi hàm từ xa đơn giản như gọi hàm cục bộ.
  - Có phản hồi ngay.
  - Thường dễ lập trình hơn trong các trường hợp đơn giản.

- **Hạn chế:**
  - Gắn kết chặt (tight coupling).
  - Không phù hợp với các hệ thống lớn hoặc cần mở rộng linh hoạt.
  - Nếu dịch vụ không phản hồi → toàn bộ hệ thống có thể bị treo.

---

### 3. So sánh

| Tiêu chí          | Message Broker            | RPC Library          |
| ----------------- | ------------------------- | -------------------- |
| Kiểu giao tiếp    | Bất đồng bộ               | Đồng bộ              |
| Cơ chế phản hồi   | Không cần (fire & forget) | Cần phản hồi tức thì |
| Khả năng chịu lỗi | Cao                       | Thấp hơn             |
| Mở rộng hệ thống  | Tốt                       | Khó mở rộng          |
| Ví dụ sử dụng     | RabbitMQ, Kafka           | gRPC, xmlrpc, Thrift |

---

## 🧪 Bài 2: Cài đặt hệ thống sử dụng Message Broker

### 1. Mô hình

Hệ thống gồm 2 thành phần:

- **Producer:** Gửi đơn hàng (message).
- **Consumer:** Nhận và xử lý đơn hàng.
- **Broker:** RabbitMQ truyền thông điệp.

---

### 2. Cài đặt RabbitMQ bằng Docker

```
docker run -d --hostname rabbit --name rabbitmq \
-p 5672:5672 -p 15672:15672 \
rabbitmq:3-management
```

Truy cập giao diện: http://localhost:15672  
Tài khoản mặc định: `guest / guest`

---

### 3. Cài đặt thư viện Python

```bash
pip install pika
```

---

### 4. Code ví dụ

#### Producer

```python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='don_hang')

order = "Đơn hàng #A001: Mua 1 điện thoại"
channel.basic_publish(exchange='', routing_key='don_hang', body=order)

print("✅ Đã gửi:", order)
connection.close()
```

#### Consumer

```python
import pika

def xu_ly(ch, method, properties, body):
    print("📥 Nhận được đơn hàng:", body.decode())

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='don_hang')

channel.basic_consume(queue='don_hang', on_message_callback=xu_ly, auto_ack=True)
print("🕓 Đang chờ đơn hàng...")
channel.start_consuming()
```

---

### 5. Phân tích

- Producer và Consumer hoạt động độc lập.
- Thích hợp với hệ thống phân tán.
- Hỗ trợ xử lý song song và mở rộng quy mô.

---

## 🔍 Bài 3: Thư viện RPC ngoài `xmlrpc`, demo với JSON

### 1. Các thư viện RPC phổ biến

- **gRPC (Google):** Dùng Protobuf, hỗ trợ đa ngôn ngữ, tốc độ cao.
- **JSON-RPC:** Giao tiếp bằng JSON, dễ dùng, phổ biến trên web.
- **Thrift (Apache):** Nhẹ, nhanh, đa ngôn ngữ.
- **RPyC:** Chuyên cho Python, hỗ trợ chia sẻ đối tượng từ xa.

---

### 2. Demo sử dụng JSON-RPC (`jsonrpcserver`)

#### Cài đặt

```bash
pip install jsonrpcserver
pip install requests
```

---

#### Server

```python
from jsonrpcserver import method, serve

@method
def nhan(a: int, b: int) -> int:
    return a * b

if __name__ == "__main__":
    print("RPC Server đang chạy tại http://localhost:5000")
    serve("localhost", 5000)
```

---

#### Client

```python
import requests
import json

payload = {
    "jsonrpc": "2.0",
    "method": "nhan",
    "params": {"a": 6, "b": 7},
    "id": 1
}

response = requests.post("http://localhost:5000", data=json.dumps(payload))
print("Kết quả:", response.json()['result'])
```

---

### 3. Nhận xét

- JSON-RPC đơn giản, dễ triển khai.
- Phù hợp hệ thống nhỏ và vừa.
- Nếu cần hiệu suất cao → dùng gRPC.

---

---
