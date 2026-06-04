import React from 'react';
import styles from './page.module.css';
import McqWidget from '../../../../components/mcq/McqWidget'; // آدرس فرضی کامپوننت آزمون شما

export default function MeniskusPage() {
  return (
    <div className={styles.container}>
      {/* هدر صفحه */}
      <header className={styles.header}>
        <span className={styles.badge}>MSK / Knie</span>
        <h1 className={styles.title}>Interaktiver MRT-Leitfaden: Meniskusriss</h1>
        <p className={styles.subtitle}>
          Systematische Analyse von Meniskusläsionen in دوقطبی (Sagittal & Koronar) PD-wfs MRT-Sequenzen.
        </p>
      </header>

      {/* بخش اصلی: اطلس تصاویر و گزارش نمونه */}
      <main className={styles.mainContent}>
        
        {/* ۱. بخش مقایسه تصاویر رادیولوژی */}
        <section className={styles.imageSection}>
          <h2 className={styles.sectionTitle}>Bildgebung (Interaktiver Atlas)</h2>
          <div className={styles.imageGrid}>
            <div className={styles.imageCard}>
              <div className={styles.imagePlaceholder}>
                {/* در آینده با کامپوننت <Image> نکس‌جی‌اس جایگزین شود */}
                <span>[ Sagittal PD-wfs: Normaler Innenmeniskus ]</span>
              </div>
              <p className={styles.imageCaption}>Abbildung 1: Homogenes, signalfreies (schwarzes) Dreieck des Hinterhorns.</p>
            </div>
            
            <div className={styles.imageCard}>
              <div className={styles.imagePlaceholder}>
                <span>[ Sagittal PD-wfs: Riss im Hinterhorn ]</span>
              </div>
              <p className={styles.imageCaption}>Abbildung 2: Horizontales, hyperintenses Signal mit direktem Gelenkflächenkontakt.</p>
            </div>
          </div>
        </section>

        {/* ۲. بخش ساختار گزارش‌نویسی استاندارد ( Befund & Beurteilung ) */}
        <section className={styles.reportSection}>
          <h2 className={styles.sectionTitle}>Klinische Befundung</h2>
          
          <div className={styles.reportBox}>
            <div className={styles.befundBlock}>
              <h3>Finding (Befund)</h3>
              <p className={styles.continuousText}>
                Die sagittal und koronar geführten protonengewichteten fettsaturierten Sequenzen zeigen eine regelrechte Artikulation der knöchernen Gelenkpartner. Im Bereich des Innenmeniskushinterhorns stellt sich eine streifige, signalangehobene Linie dar. Diese zieht horizontal durch die Meniskussubstanz und erreicht primär die kaudale Gelenkfläche auf einer Länge von ca. 6 mm. Der Außenmeniskus zeigt eine reguläre Dreiecksform und eine homogene Signalgebung ohne Evidenz für eine Rissbildung. Die Kreuzbänder und Kollateralbänder sind intakt. Kein relevanter Gelenkerguss.
              </p>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.beurteilungBlock}>
              <h3>Assessment (Beurteilung)</h3>
              <ul className={styles.nominalList}>
                <li>Horizontale, die inferiore Gelenkfläche penetrierende Meniskusrissbildung im Hinterhorn des Innenmeniskus (Grad III).</li>
                <li>Unauffälliger Außenmeniskus.</li>
                <li>Keine intraartikuläre Begleitpathologie.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ۳. بخش آزمون و ارزیابی سریع */}
        <section className={styles.quizSection}>
          <h2 className={styles.sectionTitle}>Wissensüberprüfung</h2>
          <div className={styles.quizWrapper}>
            {/* فراخوانی کامپوننت آزمون شما با ارسال دیتای مربوط به منیسک */}
            <McqWidget topic="meniskus" /> 
          </div>
        </section>

      </main>
    </div>
  );
}
