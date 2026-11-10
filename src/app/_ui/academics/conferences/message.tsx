import Inner from '@/app/_components/common/inner';
import AcademicsMessage, {
  AcademicsHighlight,
} from '@/app/_components/academics/message';

export default function ConferencesMessage() {
  return (
    <section id="academics-conferences-message">
      <Inner>
        <AcademicsMessage
          label="SOCIETY ACTIVITIES"
          className="pt-10"
          title={
            <>
              청맥병원 의료진은{' '}
              <br
                className="block
                xl:hidden"
              />
              대한혈관외과학회, 대한정맥학회, UIP 세계정맥학회 등을 비롯한{' '}
              <br
                className="hidden
                xl:block"
              />
              국내외 <AcademicsHighlight>주요 학회의 중심</AcademicsHighlight>
              에서 활발히 활동하고 있습니다.
            </>
          }
          description={
            <>
              정기 학술대회 참여와 치료 지침서 집필, 학술상 수상을 통해 혈관의학
              발전에 기여하고, <br className="hidden xl:block" />
              세계 혈관의학의 최신 흐름을 진료에 반영하기 위해 노력합니다.
            </>
          }
        />
      </Inner>
    </section>
  );
}
