/* کانتینر اصلی صفحه با تم تاریک حرفه‌ای رادیولوژی */
.container {
  min-height: 100vh;
  background-color: #0f1115;
  color: #e2e8f0;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, sans-serif;
}

/* هدر */
.header {
  max-width: 1200px;
  margin: 0 auto 3rem auto;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 1.5rem;
}

.badge {
  background-color: #3b82f6;
  color: #ffffff;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}

.title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0.75rem 0 0.5rem 0;
}

.subtitle {
  color: #94a3b8;
  font-size: 1.1rem;
}

/* بخش اصلی */
.mainContent {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.sectionTitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 0.75rem;
}

.sectionTitle::before {
  content: '';
  position: absolute;
  left: 0;
  top: 15%;
  height: 70%;
  width: 4px;
  background-color: #3b82f6;
  border-radius: 2px;
}

/* اطلس تصاویر */
.imageGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;
}

.imageCard {
  background-color: #171a21;
  border: 1px solid #272d37;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.imagePlaceholder {
  width: 100%;
  height: 350px;
  background-color: #050507;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  font-weight: 500;
  border: 1px dashed #334155;
}

.imageCaption {
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.4;
}

/* ساختار گزارش‌نویسی (Befund & Beurteilung) */
.reportBox {
  background-color: #171a21;
  border: 1px solid #272d37;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.befundBlock h3, .beurteilungBlock h3 {
  font-size: 1.2rem;
  color: #3b82f6;
  margin-bottom: 1rem;
}

/* متن پیوسته برای Befund */
.continuousText {
  font-size: 1.05rem;
  line-height: 1.75;
  color: #cbd5e1;
  text-align: justify;
}

.divider {
  height: 1px;
  background-color: #272d37;
  width: 100%;
}

/* لیست اسمی و کوتاه برای Beurteilung */
.nominalList {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nominalList li {
  font-size: 1.05rem;
  color: #e2e8f0;
  position: relative;
  padding-left: 1.25rem;
  line-height: 1.5;
}

.nominalList li::before {
  content: "•";
  color: #ef4444; /* رنگ متمایز برای تشخیص‌ها */
  font-weight: bold;
  position: absolute;
  left: 0;
  font-size: 1.2rem;
}

/* بخش آزمون */
.quizWrapper {
  background-color: #171a21;
  border: 1px solid #272d37;
  border-radius: 12px;
  padding: 1.5rem;
}

/* ریسپانسیو موبایل */
@media (max-width: 768px) {
  .imageGrid {
    grid-template-columns: 1fr;
  }
  .imagePlaceholder {
    height: 250px;
  }
  .title {
    font-size: 1.75rem;
  }
}
