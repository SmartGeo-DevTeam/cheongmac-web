import ClinicSplitHeading from '@/app/_components/clinic/split-heading';
import ClinicSplitLayout from '@/app/_components/clinic/split-layout';
import Inner from '@/app/_components/common/inner';
import ClinicSpecialistActions from '@/app/_components/clinic/specialists/actions';
import ClinicSpecialistProfiles from '@/app/_components/clinic/specialists/profiles';
import { doctors } from '@/app/_data/about/doctors/doctors';
import { venousSpecialistsContent } from '@/app/_data/vascular/venous/specialists/content';
export default function VenousSpecialists() {
  const { label, title, description, doctorIds, links } = venousSpecialistsContent;
  const selectedDoctors = doctorIds.flatMap(id => { const person = doctors.find(item => item.id === id); return person ? [person] : []; });
  return <section id="vascular-venous-specialists"><div className="mt-20 xl:mt-45"><Inner>
    <ClinicSplitLayout className="xl:items-end" leading={<div><ClinicSplitHeading label={label} title={<>{title.intro}{title.emphasis.map(line=><span key={line} className="block"><strong>{line}</strong></span>)}</>} description={description} /><ClinicSpecialistActions links={links} /></div>}>
      <ClinicSpecialistProfiles doctors={selectedDoctors} />
    </ClinicSplitLayout>
  </Inner></div></section>;
}
