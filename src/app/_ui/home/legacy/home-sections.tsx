import LegacyHomeHero from './hero';
import LegacyHomeSpecialties from './specialties';
import LegacyHomeFeaturedDoctors from './featured-doctors';
import LegacyHomeBanners from './banners';
import LegacyHomeBrandMarquee from './brand-marquee';
import LegacyHomePatientReviews from './patient-reviews';
import LegacyHomeNoticeBanners from './notice-banners';
import LegacyHomeHospitalInfo from './hospital-info';
import LegacyHomePartners from './partners';

export default function LegacyHomeSections() {
  return (
    <>
      <LegacyHomeHero />
      <LegacyHomeSpecialties />
      <LegacyHomeFeaturedDoctors />
      <LegacyHomeBanners />
      <LegacyHomeBrandMarquee />
      <LegacyHomePatientReviews />
      <LegacyHomeNoticeBanners />
      <LegacyHomeHospitalInfo />
      <LegacyHomePartners />
    </>
  );
}
