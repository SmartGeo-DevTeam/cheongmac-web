import 'server-only';

import {
  buildHomeSpecialtiesFromLegacy,
  DEFAULT_COMMON_CONTENT_BANNERS,
  DEFAULT_HOME_MIDDLE_BANNERS,
  DEFAULT_HOME_SPECIALTIES,
  type CommonContentBanner,
  type HomeMiddleBanner,
  type HomeSpecialtyCard,
} from '@/_lib/home-section-content';
import {
  buildHomeCoverContentFromLegacy,
  DEFAULT_HOME_COVER_POPUPS,
  DEFAULT_HOME_COVER_SLIDES,
  type HomeCoverPopup,
  type HomeCoverSlide,
} from '@/_lib/home-cover-content';
import {
  ABOUT_INTRO_CONTRIBUTION_ACTIVITIES,
  ABOUT_INTRO_HISTORY_YEARS,
  ABOUT_INTRO_OVERVIEW_ROWS,
  ABOUT_INTRO_PROMISES,
  ABOUT_INTRO_QUICK_LINKS,
  ABOUT_INTRO_SPECIALTY_CARDS,
  ABOUT_INTRO_WHY_POINTS,
  type AboutIntroductionContributionActivity,
  type AboutIntroductionHistoryYear,
  type AboutIntroductionOverviewRow,
  type AboutIntroductionPromise,
  type AboutIntroductionQuickLink,
  type AboutIntroductionSpecialtyCard,
  type AboutIntroductionWhyPoint,
} from '@/app/about/introduction/_data';
import {
  FACILITY_ITEMS,
  FLOOR_GUIDES,
  type FacilityItem,
  type FloorGuide,
} from '@/app/about/tour/_data';
import {
  MEDICAL_EQUIPMENT,
  type MedicalEquipment,
} from '@/app/about/equipment/_data';
import {
  ACADEMIC_EXCHANGE_HERO_IMAGES,
  ACADEMIC_EXCHANGE_POSTS,
  type AcademicExchangePost,
} from '@/app/education-research/exchange/_data';
import {
  SOCIETY_ACTIVITIES,
  SOCIETY_FEATURED,
  type SocietyActivity,
  type SocietyFeatured,
} from '@/app/education-research/society/_data';
import {
  TREATMENT_CASES,
  type TreatmentCase,
} from '@/app/community/cases/_data';
import {
  doctorLeaves,
  noticeDetails,
  notices,
  type NoticeDetail,
} from '@/app/community/notice/_data';
import {
  NEWS_ITEMS,
  type NewsItem,
} from '@/app/community/news/_data/news';
import {
  PARTNER_HOSPITALS,
  PARTNER_INSTITUTION_LOGOS,
  type PartnerHospital,
  type PartnerInstitutionLogo,
} from '@/app/guide/partner-hospital/_data';
import { Prisma } from '@/generated/prisma/client';
import {
  getManagedPageConfig,
  type ManagedPageKey,
} from '@/_lib/page-management-config';
import { prisma } from '@/_lib/prisma';

type SeedRow = {
  itemKey: string;
  itemType: string;
  title: string;
  summary?: string | null;
  category?: string | null;
  imageUrls?: string[];
  data: Prisma.InputJsonValue;
  sortOrder: number;
  isVisible?: boolean;
};

function inputJson(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function strings(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function optionalStrings(value: unknown): string[] | undefined {
  const result = strings(value);
  return result.length ? result : undefined;
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function isManagedDatabaseFallbackError(error: unknown) {
  const code =
    error && typeof error === 'object' && 'code' in error
      ? String((error as { code?: unknown }).code ?? '')
      : '';

  return code === 'P1001' || code === 'P2021' || code === 'P2022';
}

function seedRows(
  pageKey: ManagedPageKey,
  legacyCopy: Record<string, unknown> = {},
): SeedRow[] {
  switch (pageKey) {
    case 'home': {
      const { slides, popups } =
        buildHomeCoverContentFromLegacy(legacyCopy);

      return [
        ...slides.map((item, index) => ({
          itemKey: item.itemKey,
          itemType: 'slide',
          title: `${item.titleLead} ${item.titleStrong}`.trim(),
          summary: [item.description1, item.description2]
            .filter(Boolean)
            .join(' '),
          imageUrls: [item.mobileImage, item.desktopImage].filter(Boolean),
          data: inputJson(item),
          sortOrder: index,
        })),
        ...popups.map((item, index) => ({
          itemKey: item.itemKey,
          itemType: 'popup',
          title: item.title,
          summary: item.lines.join(' '),
          data: inputJson(item),
          sortOrder: 100 + index,
        })),
        ...buildHomeSpecialtiesFromLegacy(legacyCopy).map((item, index) => ({
          itemKey: item.itemKey,
          itemType: 'specialty',
          title: item.title,
          summary: item.href,
          imageUrls: [item.imageSrc],
          data: inputJson(item),
          sortOrder: 200 + index,
        })),
        ...DEFAULT_HOME_MIDDLE_BANNERS.map((item, index) => ({
          itemKey: item.itemKey,
          itemType: 'middle-banner',
          title: item.desktopAlt,
          summary: item.href,
          imageUrls: [item.mobileImage, item.desktopImage],
          data: inputJson(item),
          sortOrder: 300 + index,
        })),
      ];
    }

    case 'common-content-banners':
      return DEFAULT_COMMON_CONTENT_BANNERS.map((item, index) => ({
        itemKey: item.itemKey,
        itemType: 'content-banner',
        title: item.alt,
        summary: item.href,
        imageUrls: [item.mobileImage, item.desktopImage],
        data: inputJson(item),
        sortOrder: index,
      }));


    case 'about-introduction':
      return [
        ...ABOUT_INTRO_SPECIALTY_CARDS.map((item, index) => ({
          itemKey: item.itemKey,
          itemType: 'specialty-card',
          title: item.title,
          summary: item.description,
          imageUrls: [item.image],
          data: inputJson(item),
          sortOrder: index,
        })),
        ...ABOUT_INTRO_WHY_POINTS.map((item, index) => ({
          itemKey: item.itemKey,
          itemType: 'why-point',
          title: item.title,
          summary: item.description,
          category: item.side,
          data: inputJson(item),
          sortOrder: 100 + index,
        })),
        ...ABOUT_INTRO_PROMISES.map((item, index) => ({
          itemKey: item.itemKey,
          itemType: 'promise',
          title: item.title,
          summary: item.description,
          data: inputJson(item),
          sortOrder: 200 + index,
        })),
        ...ABOUT_INTRO_QUICK_LINKS.map((item, index) => ({
          itemKey: item.itemKey,
          itemType: 'quick-link',
          title: item.label,
          summary: item.href,
          data: inputJson(item),
          sortOrder: 300 + index,
        })),
        ...ABOUT_INTRO_OVERVIEW_ROWS.map((item, index) => ({
          itemKey: item.itemKey,
          itemType: 'overview-row',
          title: item.label,
          summary: item.value,
          data: inputJson(item),
          sortOrder: 400 + index,
        })),
        ...ABOUT_INTRO_HISTORY_YEARS.map((item, index) => ({
          itemKey: item.itemKey,
          itemType: 'history-year',
          title: String(item.year),
          summary: item.details.join(' · '),
          category: item.period,
          data: inputJson(item),
          sortOrder: 500 + index,
        })),
        ...ABOUT_INTRO_CONTRIBUTION_ACTIVITIES.map((item, index) => ({
          itemKey: item.itemKey,
          itemType: 'contribution-activity',
          title: item.title,
          summary: item.description ?? '',
          imageUrls: [item.image],
          data: inputJson(item),
          sortOrder: 600 + index,
        })),
      ];

    case 'tour':
      return [
        ...FLOOR_GUIDES.map((item, index) => ({
          itemKey: `floor:${item.floor}`,
          itemType: 'floor',
          title: item.title,
          summary: item.details.join(' · '),
          data: inputJson(item),
          sortOrder: index,
        })),
        ...FACILITY_ITEMS.map((item, index) => ({
          itemKey: `facility:${item.id}`,
          itemType: 'facility',
          title: item.title,
          summary: item.description ?? '',
          category: item.category,
          imageUrls: item.images,
          data: inputJson(item),
          sortOrder: 100 + index,
        })),
      ];

    case 'equipment':
      return MEDICAL_EQUIPMENT.map((item, index) => ({
        itemKey: item.id,
        itemType: 'equipment',
        title: item.model,
        summary: item.description ?? '',
        category: item.category,
        imageUrls: [item.image],
        data: inputJson(item),
        sortOrder: index,
      }));

    case 'exchange':
      return [
        ...ACADEMIC_EXCHANGE_HERO_IMAGES.map((item, index) => ({
          itemKey: `hero:${item.id}`,
          itemType: 'hero',
          title: item.alt,
          imageUrls: [item.src],
          data: inputJson(item),
          sortOrder: index,
        })),
        ...ACADEMIC_EXCHANGE_POSTS.map((item, index) => ({
          itemKey: `post:${item.id}`,
          itemType: 'post',
          title: item.title,
          summary: item.description,
          imageUrls: item.images,
          data: inputJson(item),
          sortOrder: 100 + index,
        })),
      ];

    case 'society':
      return [
        ...SOCIETY_FEATURED.map((item, index) => ({
          itemKey: `featured:${item.id}`,
          itemType: 'featured',
          title: item.title,
          summary: item.description,
          imageUrls: [item.image],
          data: inputJson(item),
          sortOrder: index,
        })),
        ...SOCIETY_ACTIVITIES.map((item, index) => ({
          itemKey: `activity:${item.id}`,
          itemType: 'activity',
          title: item.title,
          summary: item.description,
          category: item.society,
          imageUrls: [item.image],
          data: inputJson(item),
          sortOrder: 100 + index,
        })),
      ];

    case 'cases':
      return TREATMENT_CASES.map((item, index) => ({
        itemKey: String(item.id),
        itemType: 'case',
        title: item.title,
        summary: item.description,
        category: item.category,
        imageUrls: [item.thumbnail],
        data: inputJson(item),
        sortOrder: index,
      }));

    case 'notice': {
      const noticeRows = notices
        .filter((item) => !item.id.startsWith('archive-'))
        .map((item, index) => {
          const detail = noticeDetails[item.id];
          const data = detail ? { ...item, ...detail } : item;
          return {
            itemKey: item.id,
            itemType: 'notice',
            title: item.title,
            summary: detail?.paragraphs?.join(' ') ?? '',
            category: item.kind,
            imageUrls: detail?.image ? [detail.image] : [],
            data: inputJson(data),
            sortOrder: index,
          };
        });

      const leaveRows = doctorLeaves.map((item, index) => ({
        itemKey: `doctor-leave:${index + 1}`,
        itemType: 'doctor-leave',
        title: item.name,
        summary: item.schedule,
        category: item.department,
        imageUrls: [item.image],
        data: inputJson(item),
        sortOrder: 100 + index,
      }));

      return [...noticeRows, ...leaveRows];
    }

    case 'news': {
      const uniqueNews = NEWS_ITEMS.filter(
        (item, index, all) =>
          all.findIndex(
            (candidate) =>
              candidate.category === item.category &&
              candidate.title === item.title,
          ) === index,
      );

      return uniqueNews.map((item, index) => ({
        itemKey: String(item.id),
        itemType: 'news',
        title: item.title,
        summary: item.excerpt,
        category: item.category,
        imageUrls: [item.imageSrc],
        data: inputJson(item),
        sortOrder: index,
      }));
    }

    case 'partner-hospital':
      return [
        ...PARTNER_INSTITUTION_LOGOS.map((item, index) => ({
          itemKey: `logo:${item.id}`,
          itemType: 'logo',
          title: item.name,
          imageUrls: [item.image],
          data: inputJson(item),
          sortOrder: index,
        })),
        ...PARTNER_HOSPITALS.map((item, index) => ({
          itemKey: `hospital:${item.id}`,
          itemType: 'hospital',
          title: item.name,
          summary: item.agreement,
          category: item.category,
          imageUrls: [item.image],
          data: inputJson(item),
          sortOrder: 100 + index,
        })),
      ];
  }
}

export async function ensureManagedPageSeeded(pageKey: ManagedPageKey) {
  const state = await prisma.managedPageSeed.findUnique({
    where: { pageKey },
    select: { pageKey: true, version: true },
  });

  const targetVersion = pageKey === 'home' ? 2 : 1;

  if (state && state.version >= targetVersion) return;

  let legacyCopy: Record<string, unknown> = {};

  if (pageKey === 'home') {
    const legacy = await prisma.pageContentBlock.findUnique({
      where: {
        pageKey_sectionKey: {
          pageKey: 'page-copy',
          sectionKey: '/',
        },
      },
      select: { data: true },
    });

    legacyCopy = record(legacy?.data);
  }

  let rows = seedRows(pageKey, legacyCopy);

  // Phase 2에서 home seed(version 1)가 이미 생성된 사이트는
  // 기존 슬라이드/팝업을 다시 만들지 않고 새 유형만 보강합니다.
  if (pageKey === 'home' && state?.version === 1) {
    rows = rows.filter((row) =>
      ['specialty', 'middle-banner'].includes(row.itemType),
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.managedPageItem.createMany({
      data: rows.map((row) => ({
        pageKey,
        itemKey: row.itemKey,
        itemType: row.itemType,
        title: row.title,
        summary: row.summary ?? null,
        category: row.category ?? null,
        imageUrls: row.imageUrls ?? [],
        data: row.data,
        sortOrder: row.sortOrder,
        isVisible: row.isVisible ?? true,
      })),
      skipDuplicates: true,
    });

    await tx.managedPageSeed.upsert({
      where: { pageKey },
      create: { pageKey, version: targetVersion },
      update: { version: targetVersion },
    });

    await tx.adminAuditLog.create({
      data: {
        actorId: null,
        actorName: 'SYSTEM',
        action: 'MANAGED_PAGE_SEED',
        targetType: 'ManagedPageSeed',
        targetId: pageKey,
        source: 'SYSTEM',
        sourcePath: getManagedPageConfig(pageKey).publicHref,
        operation: state ? 'UPDATE' : 'CREATE',
        beforeData: state
          ? {
              pageKey,
              version: state.version,
            }
          : undefined,
        afterData: {
          pageKey,
          version: targetVersion,
          seededItemCount: rows.length,
        },
        changedFields: ['version', 'seededItems'],
      },
    });
  });
}

async function publicRows(pageKey: ManagedPageKey) {
  await ensureManagedPageSeeded(pageKey);

  return prisma.managedPageItem.findMany({
    where: { pageKey, isVisible: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });
}

export async function getHomeCoverManagedContent(): Promise<{
  slides: HomeCoverSlide[];
  popups: HomeCoverPopup[];
}> {
  try {
    const rows = await publicRows('home');

    return {
      slides: rows
        .filter((row) => row.itemType === 'slide')
        .map((row) => {
          const data = record(row.data);

          return {
            itemKey: row.itemKey,
            id: String(data.id ?? row.itemKey.replace(/^slide:/, 'slide-')),
            titleLead: String(data.titleLead ?? ''),
            titleStrong: String(data.titleStrong ?? row.title),
            description1: String(data.description1 ?? row.summary ?? ''),
            description2: String(data.description2 ?? ''),
            buttonLabel: String(data.buttonLabel ?? ''),
            actionType:
              data.actionType === 'macgpt' ? 'macgpt' : 'link',
            href: String(data.href ?? '/'),
            openInNewTab: Boolean(data.openInNewTab),
            mobileImage: String(
              data.mobileImage ?? row.imageUrls[0] ?? '',
            ),
            desktopImage: String(
              data.desktopImage ?? row.imageUrls[1] ?? row.imageUrls[0] ?? '',
            ),
            alt: String(data.alt ?? row.title),
          } satisfies HomeCoverSlide;
        }),
      popups: rows
        .filter((row) => row.itemType === 'popup')
        .map((row) => {
          const data = record(row.data);

          return {
            itemKey: row.itemKey,
            id: String(data.id ?? row.itemKey.replace(/^popup:/, 'popup-')),
            title: String(data.title ?? row.title),
            lines: strings(data.lines),
            backgroundColor: String(
              data.backgroundColor ?? '#3270C3',
            ),
            icon: String(data.icon ?? ''),
            href: String(data.href ?? '/'),
            openInNewTab: Boolean(data.openInNewTab),
            desktopOrder: Number(data.desktopOrder ?? row.sortOrder),
            mobileOrder: Number(data.mobileOrder ?? row.sortOrder),
          } satisfies HomeCoverPopup;
        }),
    };
  } catch (error) {
    if (isManagedDatabaseFallbackError(error)) {
      return {
        slides: DEFAULT_HOME_COVER_SLIDES,
        popups: DEFAULT_HOME_COVER_POPUPS,
      };
    }

    throw error;
  }
}

export async function getHomeSpecialtiesManagedContent(): Promise<
  HomeSpecialtyCard[]
> {
  try {
    const rows = await publicRows('home');

    return rows
      .filter((row) => row.itemType === 'specialty')
      .map((row) => {
        const data = record(row.data);

        return {
          itemKey: row.itemKey,
          id: String(
            data.id ?? row.itemKey.replace(/^specialty:/, ''),
          ),
          title: String(data.title ?? row.title),
          href: String(data.href ?? row.summary ?? '/'),
          imageSrc: String(data.imageSrc ?? row.imageUrls[0] ?? ''),
          alt: String(data.alt ?? row.title),
          openInNewTab: Boolean(data.openInNewTab),
        } satisfies HomeSpecialtyCard;
      });
  } catch (error) {
    if (isManagedDatabaseFallbackError(error)) {
      return DEFAULT_HOME_SPECIALTIES;
    }

    throw error;
  }
}

export async function getHomeMiddleBannersManagedContent(): Promise<
  HomeMiddleBanner[]
> {
  try {
    const rows = await publicRows('home');

    return rows
      .filter((row) => row.itemType === 'middle-banner')
      .map((row) => {
        const data = record(row.data);

        return {
          itemKey: row.itemKey,
          id: String(
            data.id ?? row.itemKey.replace(/^middle-banner:/, ''),
          ),
          href: String(data.href ?? row.summary ?? '/'),
          mobileImage: String(
            data.mobileImage ?? row.imageUrls[0] ?? '',
          ),
          desktopImage: String(
            data.desktopImage ?? row.imageUrls[1] ?? row.imageUrls[0] ?? '',
          ),
          mobileAlt: String(data.mobileAlt ?? row.title),
          desktopAlt: String(data.desktopAlt ?? row.title),
          openInNewTab: Boolean(data.openInNewTab),
        } satisfies HomeMiddleBanner;
      });
  } catch (error) {
    if (isManagedDatabaseFallbackError(error)) {
      return DEFAULT_HOME_MIDDLE_BANNERS;
    }

    throw error;
  }
}

export async function getCommonContentBannersManagedContent(): Promise<
  CommonContentBanner[]
> {
  try {
    const rows = await publicRows('common-content-banners');

    return rows
      .filter((row) => row.itemType === 'content-banner')
      .map((row) => {
        const data = record(row.data);

        return {
          itemKey: row.itemKey,
          id: String(
            data.id ??
              row.itemKey.replace(/^common-content-banner:/, ''),
          ),
          href: String(data.href ?? row.summary ?? '/'),
          mobileImage: String(
            data.mobileImage ?? row.imageUrls[0] ?? '',
          ),
          desktopImage: String(
            data.desktopImage ?? row.imageUrls[1] ?? row.imageUrls[0] ?? '',
          ),
          alt: String(data.alt ?? row.title),
          openInNewTab: Boolean(data.openInNewTab),
        } satisfies CommonContentBanner;
      });
  } catch (error) {
    if (isManagedDatabaseFallbackError(error)) {
      return DEFAULT_COMMON_CONTENT_BANNERS;
    }

    throw error;
  }
}


export async function getAboutIntroductionManagedContent(): Promise<{
  specialtyCards: AboutIntroductionSpecialtyCard[];
  whyPoints: AboutIntroductionWhyPoint[];
  promises: AboutIntroductionPromise[];
  quickLinks: AboutIntroductionQuickLink[];
  overviewRows: AboutIntroductionOverviewRow[];
  historyYears: AboutIntroductionHistoryYear[];
  contributionActivities: AboutIntroductionContributionActivity[];
}> {
  const rows = await publicRows('about-introduction');

  return {
    specialtyCards: rows
      .filter((row) => row.itemType === 'specialty-card')
      .map((row) => {
        const data = record(row.data);
        return {
          itemKey: row.itemKey,
          title: String(data.title ?? row.title),
          description: String(data.description ?? row.summary ?? ''),
          image: String(data.image ?? row.imageUrls[0] ?? ''),
        };
      }),
    whyPoints: rows
      .filter((row) => row.itemType === 'why-point')
      .map((row) => {
        const data = record(row.data);
        return {
          itemKey: row.itemKey,
          title: String(data.title ?? row.title),
          description: String(data.description ?? row.summary ?? ''),
          side:
            data.side === 'right' || row.category === 'right'
              ? 'right'
              : 'left',
        };
      }),
    promises: rows
      .filter((row) => row.itemType === 'promise')
      .map((row) => {
        const data = record(row.data);
        return {
          itemKey: row.itemKey,
          numberLabel: String(data.numberLabel ?? ''),
          title: String(data.title ?? row.title),
          description: String(data.description ?? row.summary ?? ''),
        };
      }),
    quickLinks: rows
      .filter((row) => row.itemType === 'quick-link')
      .map((row) => {
        const data = record(row.data);
        return {
          itemKey: row.itemKey,
          label: String(data.label ?? row.title),
          href: String(data.href ?? row.summary ?? '/'),
        };
      }),
    overviewRows: rows
      .filter((row) => row.itemType === 'overview-row')
      .map((row) => {
        const data = record(row.data);
        return {
          itemKey: row.itemKey,
          label: String(data.label ?? row.title),
          value: String(data.value ?? row.summary ?? ''),
        };
      }),
    historyYears: rows
      .filter((row) => row.itemType === 'history-year')
      .map((row) => {
        const data = record(row.data);
        const period =
          data.period === 'root' || data.period === 'future'
            ? data.period
            : row.category === 'root' || row.category === 'future'
              ? row.category
              : 'growth';

        return {
          itemKey: row.itemKey,
          period,
          year: Number(data.year ?? row.title),
          title:
            typeof data.title === 'string' && data.title
              ? data.title
              : undefined,
          details: strings(data.details),
        } satisfies AboutIntroductionHistoryYear;
      }),
    contributionActivities: rows
      .filter((row) => row.itemType === 'contribution-activity')
      .map((row) => {
        const data = record(row.data);
        return {
          itemKey: row.itemKey,
          title: String(data.title ?? row.title),
          description:
            typeof data.description === 'string' && data.description
              ? data.description
              : undefined,
          image: String(data.image ?? row.imageUrls[0] ?? ''),
        };
      }),
  };
}

export async function getHospitalTourManagedContent(): Promise<{
  floorGuides: FloorGuide[];
  facilityItems: FacilityItem[];
}> {
  const rows = await publicRows('tour');

  return {
    floorGuides: rows
      .filter((row) => row.itemType === 'floor')
      .map((row) => {
        const data = record(row.data);
        return {
          floor: String(data.floor ?? ''),
          title: String(data.title ?? row.title),
          details: strings(data.details),
        };
      }),
    facilityItems: rows
      .filter((row) => row.itemType === 'facility')
      .map((row) => {
        const data = record(row.data);
        return {
          id: String(data.id ?? row.itemKey.replace(/^facility:/, '')),
          floor: String(data.floor ?? ''),
          title: String(data.title ?? row.title),
          category: String(data.category ?? row.category ?? 'amenity') as FacilityItem['category'],
          images: strings(data.images),
          description:
            typeof data.description === 'string' ? data.description : undefined,
          bulletDetails: optionalStrings(data.bulletDetails),
          infoRows:
            Array.isArray(data.infoRows) && data.infoRows.length
              ? (data.infoRows as FacilityItem['infoRows'])
              : undefined,
        };
      }),
  };
}

export async function getMedicalEquipmentManagedContent(): Promise<
  MedicalEquipment[]
> {
  const rows = await publicRows('equipment');

  return rows
    .filter((row) => row.itemType === 'equipment')
    .map((row) => {
      const data = record(row.data);
      return {
        id: String(data.id ?? row.itemKey),
        category: String(data.category ?? row.category ?? 'imaging') as MedicalEquipment['category'],
        categoryLabel: String(data.categoryLabel ?? ''),
        title: String(data.title ?? row.title),
        model: String(data.model ?? row.title),
        image: String(data.image ?? row.imageUrls[0] ?? ''),
        subtitle:
          typeof data.subtitle === 'string' ? data.subtitle : undefined,
        description:
          typeof data.description === 'string' ? data.description : undefined,
        highlights: optionalStrings(data.highlights),
        diseases: optionalStrings(data.diseases),
        cases:
          Array.isArray(data.cases) && data.cases.length
            ? (data.cases as MedicalEquipment['cases'])
            : undefined,
      };
    });
}

export async function getAcademicExchangeManagedContent(): Promise<{
  heroImages: Array<{ id: string; src: string; alt: string }>;
  posts: AcademicExchangePost[];
}> {
  const rows = await publicRows('exchange');

  return {
    heroImages: rows
      .filter((row) => row.itemType === 'hero')
      .map((row) => {
        const data = record(row.data);
        return {
          id: String(data.id ?? row.itemKey.replace(/^hero:/, '')),
          src: String(data.src ?? row.imageUrls[0] ?? ''),
          alt: String(data.alt ?? row.title),
        };
      }),
    posts: rows
      .filter((row) => row.itemType === 'post')
      .map((row) => {
        const data = record(row.data);
        return {
          id: String(data.id ?? row.itemKey.replace(/^post:/, '')),
          date: String(data.date ?? ''),
          place: String(data.place ?? ''),
          title: String(data.title ?? row.title),
          description: String(data.description ?? row.summary ?? ''),
          images: strings(data.images),
        };
      }),
  };
}

export async function getSocietyManagedContent(): Promise<{
  featured: SocietyFeatured[];
  activities: SocietyActivity[];
}> {
  const rows = await publicRows('society');

  return {
    featured: rows
      .filter((row) => row.itemType === 'featured')
      .map((row) => {
        const data = record(row.data);
        return {
          id: String(data.id ?? row.itemKey.replace(/^featured:/, '')),
          title: String(data.title ?? row.title),
          date: String(data.date ?? ''),
          description: String(data.description ?? row.summary ?? ''),
          english: String(data.english ?? ''),
          image: String(data.image ?? row.imageUrls[0] ?? ''),
        };
      }),
    activities: rows
      .filter((row) => row.itemType === 'activity')
      .map((row) => {
        const data = record(row.data);
        return {
          id: String(data.id ?? row.itemKey.replace(/^activity:/, '')),
          year: Number(data.year ?? new Date().getFullYear()) as SocietyActivity['year'],
          society: String(data.society ?? row.category ?? ''),
          title: String(data.title ?? row.title),
          description: String(data.description ?? row.summary ?? ''),
          english:
            typeof data.english === 'string' && data.english
              ? data.english
              : undefined,
          image: String(data.image ?? row.imageUrls[0] ?? ''),
        };
      }),
  };
}

function treatmentCaseFromRow(
  row: Awaited<ReturnType<typeof publicRows>>[number],
): TreatmentCase {
  const data = record(row.data);
  return {
    id: Number(data.id ?? row.itemKey),
    kind: String(data.kind ?? 'treatment') as TreatmentCase['kind'],
    category: String(data.category ?? row.category ?? ''),
    title: String(data.title ?? row.title),
    description: String(data.description ?? row.summary ?? ''),
    patientName: String(data.patientName ?? ''),
    age: Number(data.age ?? 0),
    sex: String(data.sex ?? '남성') as TreatmentCase['sex'],
    date: String(data.date ?? ''),
    thumbnail: String(data.thumbnail ?? row.imageUrls[0] ?? ''),
    diagnosis: String(data.diagnosis ?? ''),
    treatment: String(data.treatment ?? ''),
    before: String(data.before ?? ''),
    after: String(data.after ?? ''),
    detailMedia: (data.detailMedia ?? {
      type: 'before-after',
      comparisonImage: '',
    }) as TreatmentCase['detailMedia'],
  };
}

export async function getTreatmentCasesManagedContent(): Promise<
  TreatmentCase[]
> {
  const rows = await publicRows('cases');
  return rows
    .filter((row) => row.itemType === 'case')
    .map(treatmentCaseFromRow);
}

export async function getTreatmentCaseManagedById(id: string | number) {
  await ensureManagedPageSeeded('cases');

  const row = await prisma.managedPageItem.findFirst({
    where: {
      pageKey: 'cases',
      itemKey: String(id),
      itemType: 'case',
      isVisible: true,
    },
  });

  return row ? treatmentCaseFromRow(row) : null;
}

export async function getTreatmentCaseManagedSiblings(id: string | number) {
  const items = await getTreatmentCasesManagedContent();
  const index = items.findIndex((item) => item.id === Number(id));

  return {
    previous: index > 0 ? items[index - 1] : undefined,
    next:
      index >= 0 && index < items.length - 1
        ? items[index + 1]
        : undefined,
  };
}

function noticeFromRow(
  row: Awaited<ReturnType<typeof publicRows>>[number],
): NoticeDetail {
  const data = record(row.data);

  return {
    id: row.itemKey,
    kind: String(data.kind ?? row.category ?? 'notice') as NoticeDetail['kind'],
    title: String(data.title ?? row.title),
    date: String(data.date ?? ''),
    pinned: Boolean(data.pinned),
    hasLink: Boolean(data.hasLink),
    image:
      typeof data.image === 'string'
        ? data.image
        : row.imageUrls[0] || undefined,
    imageAlt:
      typeof data.imageAlt === 'string' ? data.imageAlt : undefined,
    imageMode:
      data.imageMode === 'poster' || data.imageMode === 'wide'
        ? data.imageMode
        : undefined,
    lead: strings(data.lead),
    paragraphs: strings(data.paragraphs),
    emphasis:
      typeof data.emphasis === 'string' ? data.emphasis : undefined,
  };
}

export type ManagedDoctorLeave = {
  name: string;
  department: string;
  schedule: string;
  image: string;
};

export async function getNoticeManagedContent(): Promise<{
  notices: NoticeDetail[];
  doctorLeaves: ManagedDoctorLeave[];
}> {
  const rows = await publicRows('notice');

  return {
    notices: rows
      .filter((row) => row.itemType === 'notice')
      .map(noticeFromRow),
    doctorLeaves: rows
      .filter((row) => row.itemType === 'doctor-leave')
      .map((row) => {
        const data = record(row.data);
        return {
          name: String(data.name ?? row.title),
          department: String(data.department ?? row.category ?? ''),
          schedule: String(data.schedule ?? row.summary ?? ''),
          image: String(data.image ?? row.imageUrls[0] ?? ''),
        };
      }),
  };
}

export async function getNoticeManagedDetail(id: string) {
  const { notices: items } = await getNoticeManagedContent();
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return null;

  return {
    detail: items[index],
    previous: index > 0 ? items[index - 1] : items.at(-1),
    next: index < items.length - 1 ? items[index + 1] : items[0],
  };
}

function newsFromRow(
  row: Awaited<ReturnType<typeof publicRows>>[number],
): NewsItem {
  const data = record(row.data);

  return {
    id: Number(data.id ?? row.itemKey),
    category: String(data.category ?? row.category ?? 'inside') as NewsItem['category'],
    title: String(data.title ?? row.title),
    excerpt: String(data.excerpt ?? row.summary ?? ''),
    date: String(data.date ?? ''),
    imageSrc: String(data.imageSrc ?? row.imageUrls[0] ?? ''),
    source: typeof data.source === 'string' ? data.source : undefined,
    sourceClassName:
      typeof data.sourceClassName === 'string'
        ? data.sourceClassName
        : undefined,
    clientId:
      typeof data.clientId === 'number'
        ? (data.clientId as NewsItem['clientId'])
        : undefined,
    originalArticleUrl:
      typeof data.originalArticleUrl === 'string' && data.originalArticleUrl
        ? data.originalArticleUrl
        : undefined,
    body: strings(data.body),
  };
}

export async function getNewsManagedContent(): Promise<NewsItem[]> {
  const rows = await publicRows('news');
  return rows
    .filter((row) => row.itemType === 'news')
    .map(newsFromRow);
}

export async function getNewsManagedDetail(id: string | number) {
  const items = await getNewsManagedContent();
  const index = items.findIndex((item) => item.id === Number(id));
  if (index < 0) return null;

  return {
    item: items[index],
    previous: index > 0 ? items[index - 1] : undefined,
    next: index < items.length - 1 ? items[index + 1] : undefined,
  };
}

export async function getPartnerHospitalManagedContent(): Promise<{
  logos: PartnerInstitutionLogo[];
  hospitals: PartnerHospital[];
}> {
  const rows = await publicRows('partner-hospital');

  return {
    logos: rows
      .filter((row) => row.itemType === 'logo')
      .map((row) => {
        const data = record(row.data);
        return {
          id: String(data.id ?? row.itemKey.replace(/^logo:/, '')),
          name: String(data.name ?? row.title),
          image: String(data.image ?? row.imageUrls[0] ?? ''),
        };
      }),
    hospitals: rows
      .filter((row) => row.itemType === 'hospital')
      .map((row) => {
        const data = record(row.data);
        return {
          id: String(data.id ?? row.itemKey.replace(/^hospital:/, '')),
          category: String(data.category ?? row.category ?? 'care') as PartnerHospital['category'],
          name: String(data.name ?? row.title),
          image: String(data.image ?? row.imageUrls[0] ?? ''),
          agreement: String(data.agreement ?? row.summary ?? ''),
          phone: String(data.phone ?? ''),
          tags: strings(data.tags),
        };
      }),
  };
}

export type ManagedAdminListItem = {
  id: string;
  itemKey: string;
  itemType: string;
  title: string;
  summary: string;
  category: string;
  sortOrder: number;
  isVisible: boolean;
  updatedAt: Date;
};

export async function getManagedPageAdminList(
  pageKey: ManagedPageKey,
  {
    query = '',
    page = 1,
    pageSize = 10,
    itemType,
  }: {
    query?: string;
    page?: number;
    pageSize?: number;
    itemType?: string;
  } = {},
) {
  await ensureManagedPageSeeded(pageKey);

  const normalizedQuery = query.trim().slice(0, 120);
  const safePageSize = [10, 20, 50].includes(pageSize) ? pageSize : 10;
  const requestedPage = Math.max(1, Math.trunc(page || 1));

  const where: Prisma.ManagedPageItemWhereInput = {
    pageKey,
    ...(itemType ? { itemType } : {}),
    ...(normalizedQuery
      ? {
          OR: [
            {
              title: {
                contains: normalizedQuery,
                mode: 'insensitive',
              },
            },
            {
              summary: {
                contains: normalizedQuery,
                mode: 'insensitive',
              },
            },
            {
              category: {
                contains: normalizedQuery,
                mode: 'insensitive',
              },
            },
            {
              itemKey: {
                contains: normalizedQuery,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {}),
  };

  const total = await prisma.managedPageItem.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const safePage = Math.min(requestedPage, totalPages);

  const rows = await prisma.managedPageItem.findMany({
    where,
    orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
    skip: (safePage - 1) * safePageSize,
    take: safePageSize,
    select: {
      id: true,
      itemKey: true,
      itemType: true,
      title: true,
      summary: true,
      category: true,
      sortOrder: true,
      isVisible: true,
      updatedAt: true,
    },
  });

  return {
    items: rows.map((row): ManagedAdminListItem => ({
      id: row.id,
      itemKey: row.itemKey,
      itemType: row.itemType,
      title: row.title,
      summary: row.summary ?? '',
      category: row.category ?? '',
      sortOrder: row.sortOrder,
      isVisible: row.isVisible,
      updatedAt: row.updatedAt,
    })),
    query: normalizedQuery,
    page: safePage,
    pageSize: safePageSize,
    total,
    totalPages,
  };
}

export async function getManagedPageEditorItem(
  pageKey: ManagedPageKey,
  id: string,
) {
  await ensureManagedPageSeeded(pageKey);

  if (id === 'new') return null;

  return prisma.managedPageItem.findFirst({
    where: { id, pageKey },
  });
}
