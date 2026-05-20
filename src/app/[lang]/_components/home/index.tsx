import HomeCover from './1_cover';
import HomeNavs from './2_navs';
import HomeSpecialties from './3_specialties';
import HomeReviews from './4_reviews';
import HomeDoctors from './5_doctors';
import HomeGlobal from './6_global';

export default function HomeSections() {
  return (
    <>
      <HomeCover />
      <HomeNavs />
      <HomeSpecialties />
      <HomeReviews />
      <HomeDoctors />
      <HomeGlobal />
    </>
  );
}
