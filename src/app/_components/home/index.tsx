// import Banners from './_sections/banners';
import Banners from './_sections/banners';
import Cover from './_sections/cover';
import Doctors from './_sections/doctors';
import Info from './_sections/info';
import Name from './_sections/name';
import Notice from './_sections/notice';
import Partners from './_sections/partners';
import Reviews from './_sections/reviews';
import Specialties from './_sections/specialties';

export default function Home() {
  return (
    <>
      <Cover />
      <Specialties />
      <Doctors />
      <Banners />
      <Name />
      <Reviews />
      <Notice />
      <Info />
      <Partners />
    </>
  );
}
