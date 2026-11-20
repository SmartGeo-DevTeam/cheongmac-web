import ClinicSplitHeading from '@/app/_components/clinic/split-heading';
import ClinicSplitLayout from '@/app/_components/clinic/split-layout';
import Inner from '@/app/_components/common/inner';
import type {
  ClinicSpecialistData,
  ClinicSpecialistsContent,
} from '@/app/_types/clinic/specialists';
import ClinicSpecialistActions from './actions';
import ClinicSpecialistsCarousel from './carousel';

type ClinicSpecialistsSectionProps = {
  id: string;
  content: ClinicSpecialistsContent;
  doctors: readonly ClinicSpecialistData[];
};

/** 동맥·정맥질환에 동일하게 적용되는 의료진 섹션 조립 UI입니다. */
export default function ClinicSpecialistsSection({
  id,
  content,
  doctors,
}: ClinicSpecialistsSectionProps) {
  const { label, title, description, links } = content;
  const isMultiple = doctors.length > 1;

  return (
    <section
      id={id}
      className={isMultiple ? 'overflow-x-clip' : undefined}
    >
      <div
        className={`mt-20
          xl:mt-45`}
      >
        <Inner>
          <ClinicSplitLayout
            className="xl:items-end"
            leading={
              <div>
                <ClinicSplitHeading
                  label={label}
                  title={
                    <>
                      {title.intro}
                      {title.emphasis.map((line) => (
                        <span key={line} className="block">
                          <strong>{line}</strong>
                        </span>
                      ))}
                    </>
                  }
                  description={description}
                />

                <ClinicSpecialistActions links={links} />
              </div>
            }
          >
            <div
              className={
                isMultiple
                  ? `-mr-5 min-w-0 h-full
                      xl:mr-[calc((80rem-100vw)/2-1.25rem)]`
                  : 'min-w-0 h-full'
              }
            >
              <ClinicSpecialistsCarousel id={id} doctors={doctors} />
            </div>
          </ClinicSplitLayout>
        </Inner>
      </div>
    </section>
  );
}
