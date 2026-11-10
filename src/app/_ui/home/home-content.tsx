// import Banners from './_sections/banners';
import HomeBanners from './banners';
import HomeHero from './hero';
import HomeFeaturedDoctors from './featured-doctors';
import HomeHospitalInfo from './hospital-info';
import HomeBrandMarquee from './brand-marquee';
import HomeNoticeBanners from './notice-banners';
import HomePartners from './partners';
import HomePatientReviews from './patient-reviews';
import HomeSpecialties from './specialties';

export default function HomeContent() {
  return (
    <>
      <HomeHero />
      <HomeSpecialties />
      <HomeFeaturedDoctors />
      <HomeBanners />
      <HomeBrandMarquee />
      <HomePatientReviews />
      <HomeNoticeBanners />
      <HomeHospitalInfo />
      <HomePartners />
    </>
  );
}
