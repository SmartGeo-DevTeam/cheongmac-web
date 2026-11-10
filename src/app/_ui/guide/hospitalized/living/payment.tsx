import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import HospitalizedInformationTable from '@/app/_ui/guide/hospitalized/information-table';
import HospitalizedBulletNotices from '@/app/_ui/guide/hospitalized/bullet-notices';
import { paymentNotices, paymentRows } from '@/app/_data/guide/hospitalized/living/payment';

export default function HospitalizedLivingPayment() {
  return (
    <section id="guide-hospitalized-payment">
      <Inner>
        <SectionBlock title="중간진료비 안내" variant="side">
          <HospitalizedBulletNotices notices={paymentNotices} />

          <HospitalizedInformationTable
            headers={['납부 방법', '내용']}
            rows={paymentRows}
          />
          {/* TODO: 수납 계좌 및 이체 기준이 확인되면 안내 문구 보완 */}
        </SectionBlock>
      </Inner>
    </section>
  );
}
