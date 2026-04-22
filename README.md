# KTTKPM_MaiLuuHuuVinh_21095551_Buoi6
Thành viên nhóm:
* Lê Ngọc Dung
* Trần Thành Đạt
* Trần Phúc Hưng
* Mai Lưu Hữu Vinh
* Tô Phan Gia Bảo
## Buoi 6 - Event-Driven Architecture

### Bai toan: Movie Ticket System
He thong dat ve xem phim voi yeu cau xu ly bat dong bo (asynchronous) de dam bao kha nang mo rong (scalable).

## Yeu cau chuc nang

### 1) Quan ly phim
- Xem danh sach phim
- Them / sua phim

### 2) Quan ly nguoi dung
- Dang ky / dang nhap

### 3) Dat ve
- Chon phim + so ghe
- Tao booking

### 4) Thanh toan
- Thanh toan ve (gia lap)
- Cap nhat trang thai booking

### 5) Thong bao
- Gui thong bao khi dat ve thanh cong

## Yeu cau kien truc
Ap dung Event-Driven Architecture:
- Cac service khong goi truc tiep nhau
- Giao tiep qua Message Broker (Kafka / RabbitMQ / Redis PubSub)

### Luong event chinh
User -> Booking Service -> (Publish Event)
-> Payment Service (Consume)
-> Notification Service (Consume)

### Danh sach event
- `USER_REGISTERED`: Nguoi dung dang ky
- `BOOKING_CREATED`: Tao booking
- `PAYMENT_COMPLETED`: Thanh toan xong
- `BOOKING_FAILED`: Thanh toan that bai

## Phan cong 5 nguoi

### Nguoi 1 - Frontend (ReactJS)
UI:
- Login/Register
- Danh sach phim
- Dat ve

Luu y:
- Frontend chi goi API vao 1 service (Gateway hoac Booking Service)
- Khong goi truc tiep tat ca service

### Nguoi 2 - User Service (Spring Boot)
API:
- `POST /register`
- `POST /login`

Khi dang ky:
- Publish event: `USER_REGISTERED`

### Nguoi 3 - Movie Service
API:
- `GET /movies`
- `POST /movies`

Yeu cau:
- Khong can event phuc tap

### Nguoi 4 - Booking Service (CORE)
API:
- `POST /bookings`
- `GET /bookings`

Khi tao booking:
- Publish event: `BOOKING_CREATED`
- Khong xu ly payment truc tiep

### Nguoi 5 - Payment + Notification Service
Payment:
- Listen: `BOOKING_CREATED`
- Xu ly: Random success/fail
- Publish: `PAYMENT_COMPLETED` hoac `BOOKING_FAILED`

Notification:
- Listen: `PAYMENT_COMPLETED`
- Output: `Booking #123 thanh cong!`
- Goi API hoac log: `User A da dat don #123 thanh cong`

## Mo hinh trien khai tren LAN
- User Service: `192.168.x.x:8081`
- Movie Service: `192.168.x.x:8082`
- Booking Service: `192.168.x.x:8083`
- Payment Service: `192.168.x.x:8084`
- Frontend: `192.168.x.x:8085`

Broker chay rieng:
- Kafka / RabbitMQ: `192.168.x.x:9092`

## Kich ban test (bat buoc demo)
1. User dang ky -> log event
2. Chon phim -> dat ve
3. Payment xu ly
4. Notification hien thi ket qua

## Bonus (neu lam nhanh)
1. Dead Letter Queue
2. Retry mechanism
3. Event log (luu lich su event)
4. Dashboard realtime
5. API Gateway (Spring Cloud Gateway)

## Tieu chi cham diem
- Dung Event-Driven: 3.0
- Publish/Consume dung: 2.5
- Flow hoat dong end-to-end: 2.0
- Khong goi truc tiep service: 1.5
- Demo + log ro rang: 1.0

## Giai doan 2 (Homework)
- Dockerize toan bo he thong
- Moi service = 1 container
- `docker-compose` chay toan he thong

## Giai doan 3 (Optional)
- Chay he thong tren 1 server that (VPS hoac may lab)
