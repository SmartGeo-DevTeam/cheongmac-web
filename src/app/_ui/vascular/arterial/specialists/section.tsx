import ClinicSplitHeading from '@/app/_components/clinic/split-heading';
import ClinicSplitLayout from '@/app/_components/clinic/split-layout';
import Inner from '@/app/_components/common/inner';
import { doctors } from '@/app/_data/about/doctors/doctors';
import { arterialSpecialistsContent } from '@/app/_data/vascular/arterial/specialists/content';
import ArterialSpecialistActions from './actions';
import ArterialSpecialistProfile from './profile';

export default function ArterialSpecialists() {
  const { label, title, description, links, doctorId } =
    arterialSpecialistsContent;
  const doctor = doctors.find((item) => item.id === doctorId);

  return (
    <section id="vascular-arterial-specialists">
      <div
        className="mt-20
        xl:mt-45"
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

                <ArterialSpecialistActions links={links} />
              </div>
            }
          >
            {doctor && <ArterialSpecialistProfile doctor={doctor} />}
          </ClinicSplitLayout>
        </Inner>
      </div>
    </section>
  );
}
