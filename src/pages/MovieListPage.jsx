import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dữ liệu giả lập (Mock Data) thay cho API Get Movies tạm thời
const MOVIE_DATA = [
  {
    id: 1,
    title: 'Dune: Part Two',
    genre: 'Sci-Fi / Phiêu Lưu',
    price: '125.000đ',
    img: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg'
  },
  {
    id: 2,
    title: 'Oppenheimer',
    genre: 'Tiểu Sử / Chính Kịch',
    price: '135.000đ',
    img: 'https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg'
  },
  {
    id: 3,
    title: 'John Wick: Chapter 4',
    genre: 'Hành Động / Tội Phạm',
    price: '130.000đ',
    img: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg'
  },
  {
    id: 4,
    title: 'The Batman',
    genre: 'Hành Động / Trinh Thám',
    price: '120.000đ',
    img: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg'
  },
  {
    id: 5,
    title: 'Avatar: The Way of Water',
    genre: 'Phiêu Lưu / Viễn Tưởng',
    price: '145.000đ',
    img: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg'
  },
  {
    id: 6,
    title: 'Guardians of the Galaxy Vol. 3',
    genre: 'Hài / Khoa Học Viễn Tưởng',
    price: '125.000đ',
    img: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg'
  },
  {
    id: 7,
    title: 'Mission: Impossible - Dead Reckoning',
    genre: 'Hành Động / Điệp Viên',
    price: '140.000đ',
    img: 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg'
  },
  {
    id: 8,
    title: 'Spider-Man: Across the Spider-Verse',
    genre: 'Hoạt Hình / Siêu Anh Hùng',
    price: '120.000đ',
    img: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg'
  },
  {
    id: 9,
    title: 'Elemental',
    genre: 'Hoạt Hình / Gia Đình',
    price: '110.000đ',
    img: 'https://image.tmdb.org/t/p/w500/6oH378KUfCEitzJkm07r97L0RsZ.jpg'
  },
  {
    id: 10,
    title: 'Wonka',
    genre: 'Nhạc Kịch / Phiêu Lưu',
    price: '115.000đ',
    img: 'https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg'
  },
  {
    id: 11,
    title: 'Aquaman and the Lost Kingdom',
    genre: 'Siêu Anh Hùng / Phiêu Lưu',
    price: '125.000đ',
    img: 'https://image.tmdb.org/t/p/w500/7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg'
  },
  {
    id: 12,
    title: 'Godzilla x Kong: The New Empire',
    genre: 'Quái Vật / Hành Động',
    price: '135.000đ',
    img: 'https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg'
  },
  {
    id: 13,
    title: 'Kung Fu Panda 4',
    genre: 'Hoạt Hình / Hài',
    price: '115.000đ',
    img: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg'
  },
  {
    id: 14,
    title: 'Inside Out 2',
    genre: 'Hoạt Hình / Tâm Lý',
    price: '120.000đ',
    img: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg'
  },
  {
    id: 15,
    title: 'Deadpool & Wolverine',
    genre: 'Siêu Anh Hùng / Hài Đen',
    price: '140.000đ',
    img: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg'
  },
  {
    id: 16,
    title: 'The Fall Guy',
    genre: 'Hành Động / Hài',
    price: '125.000đ',
    img: 'https://image.tmdb.org/t/p/w500/aBkqu7EddWK7qmY4grL4I6edx2h.jpg'
  },
  {
    id: 17,
    title: 'Furiosa: A Mad Max Saga',
    genre: 'Hành Động / Hậu Tận Thế',
    price: '135.000đ',
    img: 'https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg'
  },
  {
    id: 18,
    title: 'A Quiet Place: Day One',
    genre: 'Kinh Dị / Sinh Tồn',
    price: '130.000đ',
    img: 'https://image.tmdb.org/t/p/w500/hU42CRk14JuPEdqZG3AWmagiPAP.jpg'
  },
  {
    id: 19,
    title: 'Alien: Romulus',
    genre: 'Kinh Dị / Sci-Fi',
    price: '135.000đ',
    img: 'https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg'
  },
  {
    id: 20,
    title: 'Gladiator II',
    genre: 'Sử Thi / Hành Động',
    price: '145.000đ',
    img: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg'
  }
];

const NAV_ITEMS = [
  { key: 'buy', label: 'Mua Vé', dropdown: false },
  { key: 'movie', label: 'Phim', dropdown: true },
  { key: 'shop', label: 'Star Shop', dropdown: true },
  { key: 'news', label: 'Góc Điện Ảnh', dropdown: true },
  { key: 'event', label: 'Sự Kiện', dropdown: true },
  { key: 'theater', label: 'Rạp/Giá Vé', dropdown: true }
];

const MENU_MOVIE_NOW = [
  { id: 'n1', title: 'Dune: Part Two', rating: '8.6', img: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg' },
  { id: 'n2', title: 'Godzilla x Kong', rating: '8.1', img: 'https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg' },
  { id: 'n3', title: 'Deadpool & Wolverine', rating: '8.4', img: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg' },
  { id: 'n4', title: 'Inside Out 2', rating: '8.8', img: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg' }
];

const MENU_MOVIE_SOON = [
  { id: 's1', title: 'Gladiator II', rating: '8.5', img: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg' },
  { id: 's2', title: 'Furiosa', rating: '8.3', img: 'https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg' },
  { id: 's3', title: 'Alien: Romulus', rating: '8.2', img: 'https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg' },
  { id: 's4', title: 'A Quiet Place: Day One', rating: '8.1', img: 'https://image.tmdb.org/t/p/w500/hU42CRk14JuPEdqZG3AWmagiPAP.jpg' }
];

export default function MovieListPage() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAvatarLoadError, setIsAvatarLoadError] = useState(false);
  const loggedInUser = typeof window !== 'undefined' ? localStorage.getItem('doraCineUser') || 'Khách' : 'Khách';
  const normalizedUserName = loggedInUser.trim() || 'Khách';
  const avatarInitial = normalizedUserName.charAt(0).toUpperCase();
  const avatarUrl = `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${encodeURIComponent(normalizedUserName)}&radius=50&backgroundColor=dbeafe,c7d2fe,bfe7ff,ffe4b5`;

  // Hàm xử lý khi bấm nút Đặt vé
  const handleBookTicket = (movie) => {
    // Chuyển hướng sang trang Booking và truyền kèm dữ liệu phim được chọn
    navigate('/booking', { state: { selectedMovie: movie } });
  };

  const handleBookFromMenu = (menuMovie) => {
    const normalizedMenuTitle = menuMovie.title.toLowerCase();

    const matchedMovie = MOVIE_DATA.find((movie) => {
      const normalizedMovieTitle = movie.title.toLowerCase();

      return (
        movie.img === menuMovie.img ||
        normalizedMovieTitle.includes(normalizedMenuTitle) ||
        normalizedMenuTitle.includes(normalizedMovieTitle)
      );
    });

    const fallbackMovie = {
      id: menuMovie.id,
      title: menuMovie.title,
      genre: 'Đang cập nhật',
      price: '120.000đ',
      img: menuMovie.img
    };

    handleBookTicket(matchedMovie || fallbackMovie);
    setActiveMenu(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('doraCineUser');
    navigate('/login');
  };

  const handleOpenAccount = (tab = 'profile') => {
    setUserMenuOpen(false);
    navigate(`/profile?tab=${tab}`);
  };

  const renderMovieMenu = (title, list) => (
    <div style={{ marginBottom: '14px' }}>
      <h4 style={{ color: '#2f3d55', fontSize: '30px', fontFamily: 'Barlow Condensed, sans-serif', marginBottom: '8px' }}>
        {title}
      </h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(140px, 1fr))', gap: '16px' }}>
        {list.map((movie) => (
          <article key={movie.id} style={{ cursor: 'pointer' }} onClick={() => handleBookFromMenu(movie)}>
            <div style={{ borderRadius: '8px', overflow: 'hidden', height: '175px', position: 'relative' }}>
              <img src={movie.img} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', right: '8px', bottom: '8px', background: 'rgba(8, 14, 26, 0.75)', color: '#fff', borderRadius: '999px', padding: '2px 7px', fontWeight: 700, fontSize: '12px' }}>
                ★ {movie.rating}
              </div>
            </div>
            <p style={{ marginTop: '8px', color: '#2f3d55', fontWeight: 600, fontSize: '14px' }}>{movie.title}</p>
          </article>
        ))}
      </div>
    </div>
  );

  const renderDropdownContent = () => {
    if (activeMenu === 'movie') {
      return (
        <div>
          {renderMovieMenu('PHIM ĐANG CHIẾU', MENU_MOVIE_NOW)}
          {renderMovieMenu('PHIM SẮP CHIẾU', MENU_MOVIE_SOON)}
        </div>
      );
    }

    const mapContent = {
      shop: {
        heading: 'STAR SHOP',
        items: ['Combo bắp nước', 'Voucher tháng', 'Merch DoraCine', 'Thẻ thành viên vàng']
      },
      news: {
        heading: 'GÓC ĐIỆN ẢNH',
        items: ['Review phim mới', 'Top phim cuối tuần', 'Tin hậu trường', 'Podcast điện ảnh']
      },
      event: {
        heading: 'SỰ KIỆN',
        items: ['Premiere đêm công chiếu', 'Mini game fanclub', 'Ưu đãi học sinh', 'Tuần lễ IMAX']
      },
      theater: {
        heading: 'RẠP / GIÁ VÉ',
        items: ['Tìm rạp gần bạn', 'Bảng giá theo suất', 'Lịch rạp toàn quốc', 'Ưu đãi thành viên']
      }
    };

    const selected = mapContent[activeMenu];
    if (!selected) return null;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '18px' }}>
        <div>
          <h4 style={{ color: '#2f3d55', fontSize: '30px', fontFamily: 'Barlow Condensed, sans-serif', marginBottom: '10px' }}>
            {selected.heading}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {selected.items.map((item) => (
              <div key={item} style={{ background: '#f4f7ff', border: '1px solid #dde7f6', color: '#42526f', padding: '10px 12px', borderRadius: '10px', fontWeight: 600 }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative', minHeight: '170px' }}>
          <img
            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80"
            alt="Menu visual"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8, 14, 26, 0.75), rgba(8, 14, 26, 0.25))' }} />
        </div>
      </div>
    );
  };

  return (
    <div className="page-shell" style={{ paddingTop: '18px' }}>
      <section
        style={{
          background: 'rgba(248, 250, 255, 0.96)',
          borderRadius: '20px',
          padding: '14px 22px',
          marginBottom: '14px',
          boxShadow: '0 16px 30px rgba(9, 20, 42, 0.22)',
          position: 'relative',
          zIndex: 12
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr auto', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '40px', color: '#1554b5', fontWeight: 800, letterSpacing: '0.8px' }}>
            DoraCine
          </div>

          <div className="dora-nav-wrapper" onMouseLeave={() => setActiveMenu(null)}>
            <nav className="dora-nav-main">
              {NAV_ITEMS.map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  className={`dora-nav-item ${index === 0 ? 'is-primary' : ''}`}
                  onMouseEnter={() => setActiveMenu(item.dropdown ? item.key : null)}
                >
                  {item.label}
                  {item.dropdown ? <span style={{ marginLeft: '6px', fontSize: '10px' }}>▼</span> : null}
                </button>
              ))}
            </nav>

            {activeMenu ? (
              <div className="dora-dropdown-panel">
                {renderDropdownContent()}
              </div>
            ) : null}
          </div>

          <div
            className="dora-user-menu"
            onMouseEnter={() => setUserMenuOpen(true)}
            onMouseLeave={() => setUserMenuOpen(false)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '999px',
                  padding: '2px',
                  background: 'linear-gradient(135deg, #6ea8ff, #93d5ff, #ffc57a)',
                  boxShadow: '0 8px 16px rgba(20, 58, 124, 0.18)'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.75)',
                    background: 'linear-gradient(145deg, #eef5ff, #f9fbff)',
                    display: 'grid',
                    placeItems: 'center'
                  }}
                >
                  {isAvatarLoadError ? (
                    <span style={{ color: '#355189', fontWeight: 800, fontSize: '18px' }}>{avatarInitial}</span>
                  ) : (
                    <img
                      src={avatarUrl}
                      alt={`Avatar ${normalizedUserName}`}
                      style={{ width: '100%', height: '100%' }}
                      onError={() => setIsAvatarLoadError(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <div style={{ color: '#2f3d55', fontWeight: 700, fontSize: '20px' }}>{loggedInUser}</div>
                <div style={{ color: '#5e6f8f', fontWeight: 600, fontSize: '14px' }}>0 Stars</div>
              </div>
            </div>

            {userMenuOpen ? (
              <div className="dora-account-dropdown">
                <button type="button" className="dora-account-item is-active" onClick={() => handleOpenAccount('profile')}>
                  Tài khoản
                </button>
                <button type="button" className="dora-account-item" onClick={() => handleOpenAccount('history')}>
                  Lịch sử
                </button>
                <button type="button" className="dora-account-item" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="glass-panel" style={{ overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ position: 'relative', minHeight: '330px' }}>
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=80"
            alt="Cinema Banner"
            style={{ width: '100%', height: '330px', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(100deg, rgba(9, 14, 26, 0.84) 0%, rgba(9, 14, 26, 0.45) 55%, rgba(9, 14, 26, 0.2) 100%)'
            }}
          />
          <div style={{ position: 'absolute', left: '28px', bottom: '80px', right: '28px' }}>
            <span className="pill" style={{ borderColor: 'rgba(255, 255, 255, 0.35)', color: '#e8efff' }}>Now Showing</span>
            <h1 className="section-title" style={{ marginTop: '12px', lineHeight: 1, fontSize: 'clamp(36px, 6vw, 64px)' }}>
              Chọn Phim Của Bạn
            </h1>
            <p style={{ maxWidth: '720px', marginTop: '10px', color: '#d6e3ff', fontSize: '18px' }}>
              Trải nghiệm đặt vé nhanh, giao diện trực quan và thông tin lịch chiếu rõ ràng trên DoraCine.
            </p>
          </div>
        </div>

        <div
          style={{
            margin: '-24px 24px 0',
            position: 'relative',
            zIndex: 3,
            background: '#f8fbff',
            borderRadius: '12px',
            border: '1px solid #dde7f6',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr) 180px',
            overflow: 'hidden'
          }}
        >
          {['Chọn Phim', 'Chọn Rạp', 'Chọn Ngày', 'Chọn Suất'].map((item, index) => (
            <div key={item} style={{ padding: '14px 16px', borderRight: '1px solid #e6edf8', color: '#4b5d7e', fontWeight: 600 }}>
              <span style={{ color: '#ff8c16', marginRight: '8px' }}>{index + 1}</span>{item}
            </div>
          ))}
          <button
            style={{
              border: 'none',
              background: 'linear-gradient(120deg, #ffbe73, #ff9f4d)',
              color: '#6b3a00',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Mua vé nhanh
          </button>
        </div>

        <div style={{ marginTop: '20px', padding: '0 24px 20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span className="pill">Toàn quốc</span>
          <span className="pill">2D / IMAX</span>
          <span className="pill">Khởi chiếu hôm nay</span>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {MOVIE_DATA.map((movie, index) => (
          <article
            key={movie.id}
            className="glass-panel"
            style={{ overflow: 'hidden', transition: 'transform 0.25s ease, box-shadow 0.25s ease', animation: `revealUp 0.45s ease ${index * 0.08}s both` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 22px 30px rgba(7, 17, 34, 0.42)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <div style={{ height: '320px', width: '100%', overflow: 'hidden', position: 'relative' }}>
              <img
                src={movie.img}
                alt={movie.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.02)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13, 19, 33, 0.9) 0%, transparent 45%)' }} />
              <span className="pill" style={{ position: 'absolute', left: '14px', bottom: '14px' }}>{movie.price}</span>
            </div>

            <div style={{ padding: '18px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.2, minHeight: '54px' }}>
                {movie.title}
              </h3>
              <p className="section-subtitle" style={{ marginTop: '8px', marginBottom: '16px' }}>
                {movie.genre}
              </p>

              <button
                className="primary-btn"
                onClick={() => handleBookTicket(movie)}
              >
                Đặt Vé Ngay
              </button>
            </div>
          </article>
        ))}
      </section>

      <style>{`
        .dora-nav-wrapper {
          position: relative;
          padding-bottom: 10px;
          margin-bottom: -10px;
        }

        .dora-nav-main {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .dora-nav-item {
          font-weight: 600;
          color: #42526f;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 15px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .dora-nav-item:hover {
          background: #eef4ff;
          color: #233a66;
        }

        .dora-nav-item.is-primary {
          background: linear-gradient(120deg, #ff9f1c, #ff7a00);
          color: #fff;
          font-weight: 700;
        }

        .dora-dropdown-panel {
          position: absolute;
          top: 100%;
          left: 0;
          width: min(980px, 95vw);
          max-height: min(72vh, 620px);
          overflow: auto;
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid #dce7fb;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 18px 38px rgba(8, 16, 36, 0.2);
          animation: menuReveal 0.2s ease;
          z-index: 50;
        }

        .dora-user-menu {
          position: relative;
          padding-bottom: 6px;
          margin-bottom: -6px;
        }

        .dora-account-dropdown {
          position: absolute;
          right: 0;
          top: 100%;
          min-width: 190px;
          background: #ffffff;
          border: 1px solid #dce7fb;
          border-radius: 10px;
          box-shadow: 0 16px 30px rgba(8, 16, 36, 0.2);
          overflow: hidden;
          animation: menuReveal 0.2s ease;
          z-index: 60;
        }

        .dora-account-item {
          width: 100%;
          border: none;
          text-align: left;
          background: #fff;
          color: #2f3d55;
          padding: 11px 14px;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 1px solid #eef2fb;
        }

        .dora-account-item:last-child {
          border-bottom: none;
        }

        .dora-account-item:hover {
          background: #f4f7ff;
        }

        .dora-account-item.is-active {
          border-left: 3px solid #ff8c16;
          background: #fff4e8;
          color: #df6f00;
          padding-left: 11px;
        }

        @keyframes menuReveal {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1200px) {
          .dora-nav-main {
            gap: 10px !important;
          }
        }

        @media (max-width: 980px) {
          .page-shell > section:first-child > div {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .page-shell > section:nth-child(2) div[style*='grid-template-columns: repeat(4, 1fr) 180px'] {
            grid-template-columns: 1fr !important;
            margin: 10px 14px 0 !important;
          }

          .dora-dropdown-panel {
            display: none;
          }

          .dora-account-dropdown {
            right: auto;
            left: 0;
          }
        }
      `}</style>
    </div>
  );
}