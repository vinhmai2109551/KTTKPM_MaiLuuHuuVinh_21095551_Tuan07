import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Lấy dữ liệu phim được truyền từ trang Danh sách phim
  const movie = location.state?.selectedMovie;
  const [selectedSeat, setSelectedSeat] = useState('');

  // Nếu người dùng gõ thẳng url /booking mà chưa chọn phim, đẩy về trang danh sách
  useEffect(() => {
    if (!movie) {
      navigate('/movies');
    }
  }, [movie, navigate]);

  if (!movie) return null;

  // Danh sách ghế giả lập
  const SEATS = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4'];
  const PRICE_VALUE = Number.parseInt(movie.price.replace(/\D/g, ''), 10) || 0;
  const SERVICE_FEE = 15000;
  const TOTAL = PRICE_VALUE + SERVICE_FEE;

  const handleBooking = () => {
    if (!selectedSeat) {
      toast.warning("Vui lòng chọn một ghế ngồi!");
      return;
    }

    // BƯỚC 1: Gọi API đến Booking Service (Hiển thị trạng thái đang xử lý)
    toast.info("Đang gửi yêu cầu đặt vé và xử lý thanh toán...", { autoClose: false, toastId: 'bookingToast' });

    // Tạm thời dùng setTimeout để giả lập quá trình Event chạy ngầm qua Kafka/RabbitMQ
    setTimeout(() => {
      // BƯỚC 2: Nhận Notification Event trả về thành công
      toast.update('bookingToast', { render: "🎉 Đặt vé thành công! Vui lòng kiểm tra email.", type: "success", autoClose: 3000 });
      
      // Chuyển về trang chủ sau khi hoàn tất
      setTimeout(() => navigate('/movies'), 2000);
    }, 2500);
  };

  return (
    <div className="page-shell">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap' }}>
        <div>
          <span className="pill" style={{ marginBottom: '10px' }}>Booking Checkout</span>
          <h1 className="section-title" style={{ lineHeight: 1 }}>Xác Nhận Đặt Vé</h1>
        </div>
        <button className="ghost-btn" style={{ width: 'auto', paddingInline: '20px' }} onClick={() => navigate('/movies')}>
          Quay lại danh sách phim
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '20px' }}>
        <section className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ marginBottom: '18px' }}>
            <div style={{ height: '8px', borderRadius: '999px', background: 'linear-gradient(90deg, #2ec4b6, #ff9f1c)', marginBottom: '12px' }} />
            <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-soft)' }}>MÀN HÌNH</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(60px, 1fr))', gap: '10px', marginBottom: '18px' }}>
            {SEATS.map((seat) => (
              <button
                key={seat}
                onClick={() => setSelectedSeat(seat)}
                style={{
                  padding: '14px 10px',
                  borderRadius: '11px',
                  border: selectedSeat === seat ? '1px solid #ff9f1c' : '1px solid rgba(169, 190, 223, 0.4)',
                  background: selectedSeat === seat
                    ? 'linear-gradient(125deg, rgba(255, 159, 28, 0.24), rgba(255, 122, 0, 0.24))'
                    : 'rgba(10, 18, 34, 0.75)',
                  color: 'var(--text-main)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {seat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="pill">Ghế trống</span>
            <span className="pill" style={{ background: 'rgba(255, 159, 28, 0.18)', borderColor: 'rgba(255, 159, 28, 0.5)', color: '#ffd8a0' }}>
              Ghế đang chọn
            </span>
          </div>
        </section>

        <section className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <img
              src={movie.img}
              alt={movie.title}
              style={{ width: '95px', height: '130px', objectFit: 'cover', borderRadius: '12px', border: '1px solid rgba(169, 190, 223, 0.4)' }}
            />
            <div>
              <h2 style={{ fontSize: '24px', lineHeight: 1.1 }}>{movie.title}</h2>
              <p className="section-subtitle" style={{ marginTop: '6px' }}>{movie.genre}</p>
              <p style={{ marginTop: '8px', color: '#ffe0b2', fontWeight: 700 }}>{movie.price}</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="section-subtitle">Ghế đã chọn</span>
              <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{selectedSeat || 'Chưa chọn'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="section-subtitle">Tiền vé</span>
              <span>{PRICE_VALUE.toLocaleString('vi-VN')}đ</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="section-subtitle">Phí dịch vụ</span>
              <span>{SERVICE_FEE.toLocaleString('vi-VN')}đ</span>
            </div>
            <div style={{ height: '1px', background: 'rgba(169, 190, 223, 0.35)', margin: '10px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 800 }}>
              <span>Tổng cộng</span>
              <span style={{ color: '#ffcb77' }}>{TOTAL.toLocaleString('vi-VN')}đ</span>
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <button
              className="primary-btn"
              onClick={handleBooking}
              style={{ padding: '16px', fontSize: '17px' }}
            >
              Thanh Toán & Xác Nhận
            </button>
            <button
              className="ghost-btn"
              onClick={() => setSelectedSeat('')}
              style={{ marginTop: '10px' }}
            >
              Chọn lại ghế
            </button>
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .page-shell > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}