import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = typeof window !== 'undefined' ? localStorage.getItem('doraCineUser') || 'Khách hàng DoraCine' : 'Khách hàng DoraCine';
  const activeTab = useMemo(() => {
    const tab = new URLSearchParams(location.search).get('tab');
    return tab === 'history' ? 'history' : 'profile';
  }, [location.search]);

  return (
    <div className="page-shell" style={{ paddingTop: '26px' }}>
      <section style={{ background: 'rgba(248, 250, 255, 0.96)', borderRadius: '18px', border: '1px solid #dce7fb', boxShadow: '0 16px 30px rgba(9, 20, 42, 0.18)', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '14px', flexWrap: 'wrap' }}>
          <h1 className="section-title" style={{ color: '#1f3357', fontSize: '44px' }}>Tài Khoản DoraCine</h1>
          <button className="ghost-btn" style={{ width: 'auto', color: '#2f3d55', borderColor: '#c9d8f5' }} onClick={() => navigate('/movies')}>
            Quay lại trang phim
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '18px' }}>
          <aside style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e4ecfb', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '58px', height: '58px', borderRadius: '999px', background: 'linear-gradient(145deg, #dde9ff, #f8fbff)', border: '1px solid #c7d8f8' }} />
              <div>
                <div style={{ color: '#2f3d55', fontWeight: 800, fontSize: '28px', fontFamily: 'Barlow Condensed, sans-serif' }}>{userName}</div>
                <div style={{ color: '#6a7d9f', fontWeight: 600 }}>0 Stars</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #edf2fc', paddingTop: '12px', color: '#4d5f7f' }}>
              <div style={{ marginBottom: '8px' }}>HOTLINE hỗ trợ: 19002224 (9:00 - 22:00)</div>
              <div style={{ marginBottom: '8px' }}>Email: hotro@doracine.vn</div>
              <div>Câu hỏi thường gặp</div>
            </div>
          </aside>

          <main style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e4ecfb', padding: '18px' }}>
            <div style={{ display: 'flex', gap: '18px', borderBottom: '1px solid #edf2fc', marginBottom: '14px' }}>
              <button
                type="button"
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: '10px 2px',
                  marginBottom: '-1px',
                  color: activeTab === 'history' ? '#1e5ab5' : '#6a7d9f',
                  fontWeight: activeTab === 'history' ? 700 : 600,
                  borderBottom: activeTab === 'history' ? '2px solid #1e5ab5' : '2px solid transparent',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/profile?tab=history')}
              >
                Lịch Sử Giao Dịch
              </button>
              <button
                type="button"
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: '10px 2px',
                  marginBottom: '-1px',
                  color: activeTab === 'profile' ? '#1e5ab5' : '#6a7d9f',
                  fontWeight: activeTab === 'profile' ? 700 : 600,
                  borderBottom: activeTab === 'profile' ? '2px solid #1e5ab5' : '2px solid transparent',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/profile?tab=profile')}
              >
                Thông Tin Cá Nhân
              </button>
            </div>

            {activeTab === 'profile' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ color: '#4f6283', fontWeight: 600 }}>Họ và tên</label>
                  <input className="input-field" value={userName} readOnly style={{ marginTop: '6px', background: '#f7faff', color: '#3a4f72' }} />
                </div>
                <div>
                  <label style={{ color: '#4f6283', fontWeight: 600 }}>Ngày sinh</label>
                  <input className="input-field" value="05/06/2003" readOnly style={{ marginTop: '6px', background: '#f7faff', color: '#3a4f72' }} />
                </div>
                <div>
                  <label style={{ color: '#4f6283', fontWeight: 600 }}>Email</label>
                  <input className="input-field" value="user@doracine.vn" readOnly style={{ marginTop: '6px', background: '#f7faff', color: '#3a4f72' }} />
                </div>
                <div>
                  <label style={{ color: '#4f6283', fontWeight: 600 }}>Số điện thoại</label>
                  <input className="input-field" value="0366 455 751" readOnly style={{ marginTop: '6px', background: '#f7faff', color: '#3a4f72' }} />
                </div>
                <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button className="primary-btn" style={{ width: 'auto', paddingInline: '24px' }}>Cập nhật</button>
                </div>
              </div>
            ) : (
              <div style={{ color: '#465b7f' }}>
                <div style={{ marginBottom: '10px', fontWeight: 700 }}>Giao dịch gần đây</div>
                <div style={{ border: '1px solid #e4ecfb', borderRadius: '10px', padding: '12px', marginBottom: '10px' }}>
                  #BK20260422 - Dune: Part Two - 125.000đ - Thành công
                </div>
                <div style={{ border: '1px solid #e4ecfb', borderRadius: '10px', padding: '12px', marginBottom: '10px' }}>
                  #BK20260418 - Inside Out 2 - 120.000đ - Thành công
                </div>
                <div style={{ border: '1px solid #e4ecfb', borderRadius: '10px', padding: '12px' }}>
                  #BK20260410 - Oppenheimer - 135.000đ - Hoàn tất
                </div>
              </div>
            )}
          </main>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .page-shell > section > div:last-child {
            grid-template-columns: 1fr !important;
          }

          .page-shell main > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
