# KTTKPM_MaiLuuHuuVinh_21095551_Tuan07
Buổi 6 — EVENT-DRIVEN ARCHITECTURE

## Movie Ticket System (Asynchronous)

Dự án bổ sung mô hình đặt vé xem phim xử lý bất đồng bộ bằng `asyncio`:
- Hàng đợi booking request (`asyncio.Queue`)
- Worker xử lý song song giúp mở rộng (scalable)
- Đồng bộ đặt ghế bằng khóa bất đồng bộ để tránh oversell

### Chạy test

```bash
python -m unittest -v
```
