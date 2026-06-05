import HomeCover from './1_cover';
import HomeSpecialties from './2_specialties';
import HomeDoctors from './3_doctors';
import HomeBanners from './4_banners';
import HomeName from './5_name';
import HomeReviews from './6_reviews';
import HomeNotice from './7_notice';
import HomeInfo from './8_info';
import HomePartners from './9_partners';

export default function HomeSections() {
  return (
    <>
      <HomeCover />
      <HomeSpecialties />
      <HomeDoctors />
      <HomeBanners />
      <HomeName />
      <HomeReviews />
      <HomeNotice />
      <HomeInfo />
      <HomePartners />
    </>
  );
}
