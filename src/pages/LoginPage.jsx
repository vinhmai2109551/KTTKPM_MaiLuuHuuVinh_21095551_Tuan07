import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    toast.info("Đang kết nối hệ thống...");

    // Giả lập call API
    setTimeout(() => {
      localStorage.setItem('doraCineUser', username.trim());
      toast.success(isLogin ? "Đăng nhập thành công!" : "Đăng ký thành công!");
      navigate('/movies');
    }, 1200);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(110deg, rgba(8, 14, 28, 0.88), rgba(8, 14, 28, 0.65)), url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />

      <div
        className="page-shell"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: '24px',
          alignItems: 'stretch',
          minHeight: '100vh'
        }}
      >
        <section
          className="glass-panel"
          style={{ padding: '34px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}
        >
          <div className="dora-glow" />
          <div className="dora-ring" />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
            <span className="pill" style={{ fontWeight: 700 }}>DoraCine</span>
            <span className="pill" style={{ paddingInline: '12px' }}>Premium Booking</span>
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 className="section-title" style={{ maxWidth: '520px', lineHeight: 1, fontSize: 'clamp(36px, 5vw, 72px)' }}>
              DoraCine
            </h1>
            <h2 className="section-title" style={{ maxWidth: '520px', lineHeight: 1, marginTop: '10px' }}>
              Trải Nghiệm Đặt Vé Thông Minh
            </h2>
            <p className="section-subtitle" style={{ marginTop: '14px', maxWidth: '560px', fontSize: '16px' }}>
              Nền tảng đặt vé phim hiện đại với luồng xử lý nhanh, giao diện trực quan và trải nghiệm người dùng mượt mà.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 2, marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(110px, 1fr))', gap: '10px' }}>
            <div className="dora-chip">
              <span>Showtimes</span>
              <strong>24/7</strong>
            </div>
            <div className="dora-chip">
              <span>Seat Map</span>
              <strong>Live</strong>
            </div>
            <div className="dora-chip">
              <span>E-Ticket</span>
              <strong>Instant</strong>
            </div>
          </div>
        </section>

        <section className="glass-panel" style={{ padding: '36px 30px', alignSelf: 'center' }}>
          <div style={{ marginBottom: '26px' }}>
            <span className="pill" style={{ marginBottom: '12px' }}>{isLogin ? 'Welcome Back' : 'Create New Account'}</span>
            <h2 className="section-title" style={{ fontSize: '34px' }}>
              {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input
              type="text"
              className="input-field"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="primary-btn" style={{ marginTop: '8px' }}>
              {isLogin ? 'Vào Rạp Ngay' : 'Tạo Tài Khoản'}
            </button>
          </form>

          <button
            type="button"
            className="ghost-btn"
            style={{ marginTop: '12px' }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
          </button>
        </section>
      </div>

      <style>{`
        .dora-glow {
          position: absolute;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(255, 160, 28, 0.36) 0%, rgba(255, 160, 28, 0) 70%);
          top: -140px;
          right: -90px;
          z-index: 0;
          animation: doraPulse 6s ease-in-out infinite;
        }

        .dora-ring {
          position: absolute;
          width: 240px;
          height: 240px;
          border-radius: 999px;
          border: 1px solid rgba(167, 206, 255, 0.35);
          top: 36%;
          left: -100px;
          z-index: 0;
          animation: doraFloat 8s ease-in-out infinite;
        }

        .dora-chip {
          padding: 12px;
          border-radius: 14px;
          border: 1px solid rgba(167, 206, 255, 0.35);
          background: linear-gradient(170deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
          display: flex;
          flex-direction: column;
          gap: 6px;
          animation: doraReveal 0.7s ease both;
        }

        .dora-chip span {
          color: var(--text-soft);
          font-size: 12px;
        }

        .dora-chip strong {
          font-size: 20px;
          font-family: 'Barlow Condensed', sans-serif;
          letter-spacing: 0.5px;
          color: #ffd38a;
        }

        .dora-chip:nth-child(2) {
          animation-delay: 0.1s;
        }

        .dora-chip:nth-child(3) {
          animation-delay: 0.2s;
        }

        @keyframes doraPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.12);
            opacity: 0.75;
          }
        }

        @keyframes doraFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-16px);
          }
        }

        @keyframes doraReveal {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 980px) {
          .page-shell {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }

          .page-shell > section {
            width: 100%;
          }

          .dora-chip {
            padding: 10px;
          }

          .dora-ring {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .dora-chip strong {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}