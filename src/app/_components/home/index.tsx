import HomeCover from './1_cover';
import HomeSpecialties from './2_specialties';
import HomeDoctors from './3_doctors';
import HomeBanners from './4_banners';
import HomeName from './5_name';
import HomeReviews from './6_reviews';
import HomeNotice from './7_notice';
import HomeInfo from './8_info';
import HomePartners from './9_partners';
import { getPageContentBlock } from '@/_lib/page-content-blocks';
import { getPublicPageCopyConfig } from '@/_lib/public-page-copy';

export default async function HomeSections() {
  const config = getPublicPageCopyConfig('/');
  const content = await getPageContentBlock(
    'page-copy',
    '/',
    config.defaults,
  );

  const copyProps = {
    copy: content.data,
    persisted: content.persisted,
  };

  return (
    <>
      <HomeCover {...copyProps} />
      <HomeSpecialties {...copyProps} />
      <HomeDoctors {...copyProps} />
      <HomeBanners />
      <HomeName {...copyProps} />
      <HomeReviews {...copyProps} />
      <HomeNotice />
      <HomeInfo {...copyProps} />
      <HomePartners />
    </>
  );
}
