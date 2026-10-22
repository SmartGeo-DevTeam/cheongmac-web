import Image from 'next/image';
import type { HistoryType } from '../../data';
import { getHistorySectionStyles } from '../../styles';
import HistoryContent from '../_history-content';

export function HistorySection({
  section,
  isFirst,
}: {
  section: HistoryType;
  isFirst: boolean;
}) {
  const styles = getHistorySectionStyles(section.id);

  return (
    <>
      <section id={section.id}>
        <div className={`${styles.section} ${isFirst ? 'mt-5 xl:mt-25' : ''}`}>
          {/* 섹션 소개 */}
          <div className={`${styles.background} ${styles.backgroundAspect}`}>
            {/* 모바일 이미지 */}
            <Image
              src={section.background.mobile}
              alt=""
              fill
              className="object-cover xl:hidden"
            />

            {/* PC 이미지 */}
            <Image
              src={section.background.desktop}
              alt=""
              fill
              className="hidden object-cover xl:block"
            />

            {/* 기간별 별도 스타일 */}
            <div className={`${styles.content} ${styles.contentColor}`}>
              <span className={styles.period}>{section.period}</span>

              <h2 className={`${styles.titleMargin} ${styles.title}`}>
                {section.title}
              </h2>

              <p className={styles.desc}>{section.desc}</p>
            </div>
          </div>

          <HistoryContent section={section} />
        </div>
      </section>
    </>
  );
}
