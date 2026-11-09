import Inner from '@/app/_components/common/inner';
import SectionBlock from '@/app/_components/common/section-block';
import InformationTable from '@/app/guide/hospitalized/_components/_information-table';
import BulletNotices from '@/app/_components/guide/bullet-notices';
import { paymentNotices, paymentRows } from './data';

export default function LivingPayment() {
  return (
    <section id="guide-hospitalized-payment">
      <Inner>
        <SectionBlock title="중간진료비 안내" variant="side">
          <BulletNotices notices={paymentNotices} />

          <InformationTable
            headers={['납부 방법', '내용']}
            rows={paymentRows}
          />
          {/* TODO: 수납 계좌 및 이체 기준이 확인되면 안내 문구 보완 */}
        </SectionBlock>
      </Inner>
    </section>
  );
}
