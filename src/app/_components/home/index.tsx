import HomeCover from './1_cover';
import HomeSpecialties from './2_specialties';
import HomeDoctors from './3_doctors';
import HomeBanners from './4_banners';
import HomeName from './5_name';
import HomeReviews from './6_reviews';
import HomeNotice from './7_notice';
import HomeInfo from './8_info';
import HomePartners from './9_partners';
import { getHomeDoctors } from '@/_lib/doctors';
import {
  getHomeCoverManagedContent,
  getHomeMiddleBannersManagedContent,
  getHomeSpecialtiesManagedContent,
} from '@/_lib/managed-pages';
import { getPageContentBlock } from '@/_lib/page-content-blocks';
import { getPublicPageCopyConfig } from '@/_lib/public-page-copy';

export default async function HomeSections() {
  const config = getPublicPageCopyConfig('/');

  const content = await getPageContentBlock(
    'page-copy',
    '/',
    config.defaults,
  );

  // 메인 전용 collection은 ManagedPageItem, 의료진은 Doctor DB를
  // canonical source로 사용합니다.
  const homeCover = await getHomeCoverManagedContent();
  const homeSpecialties = await getHomeSpecialtiesManagedContent();
  const homeBanners = await getHomeMiddleBannersManagedContent();
  const homeDoctors = await getHomeDoctors();

  const copyProps = {
    copy: content.data,
    persisted: content.persisted,
  };

  return (
    <>
      <HomeCover
        {...copyProps}
        slides={homeCover.slides}
        popups={homeCover.popups}
      />
      <HomeSpecialties
        {...copyProps}
        items={homeSpecialties}
      />
      <HomeDoctors
        {...copyProps}
        doctors={homeDoctors}
      />
      <HomeBanners items={homeBanners} />
      <HomeName {...copyProps} />
      <HomeReviews {...copyProps} />
      <HomeNotice />
      <HomeInfo {...copyProps} />
      <HomePartners />
    </>
  );
}
