import {
  fields,
  type DoctorType,
} from '@/app/about/doctors/_sections/_doctors/data';
import Image from 'next/image';
import type { DoctorOff, HospitalOff, OffDate } from '../../../data';
import { formatOffPeriod, getOffSessionLabel } from '../_lib/offs';

type OffItemProps =
  | {
      variant: 'hospital';
      off: HospitalOff;
      today: OffDate;
    }
  | {
      variant: 'doctor';
      doctor: DoctorType;
      schedules: DoctorOff[];
      today: OffDate;
    };

/** 병원 휴진과 의료진 휴진에서 동일하게 사용하는 카드입니다. */
export default function OffItem(props: OffItemProps) {
  const isHospital = props.variant === 'hospital';

  // 현재는 의료진 데이터의 이미지 경로를 사용합니다.
  // DB 연동 시 doctor.mobileImgSrc에 DB의 사진 URL을 전달하면 됩니다.
  const imageSrc = isHospital
    ? '/notice/hospital.png'
    : props.doctor.mobileImgSrc;
  const imageAlt = isHospital ? '청맥병원' : `${props.doctor.name} 원장`;

  const department = isHospital
    ? undefined
    : fields.find((field) => props.doctor.fieldIds.includes(field.id))?.name;

  const title = isHospital
    ? props.off.title
    : `${department ? `${department} ` : ''}${props.doctor.name} 원장`;

  const schedules = isHospital ? [props.off] : props.schedules;

  return (
    <li
      className={`
          p-4 flex items-center gap-4 rounded-lg border border-default
          ${isHospital ? 'bg-ai-subtle xl:col-span-2' : ''}
          `}
    >
      <div className="relative size-15 rounded-md overflow-clip">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      </div>

      <div className="flex-1 font-medium">
        <h3
          className={`text-[15px]
              ${isHospital ? 'text-legacy-red' : 'text-secondary'}`}
        >
          {title}
        </h3>

        <ul className="">
          {schedules.map((off) => (
            <li
              key={off.id}
              className="relative pl-4.5
                before:absolute before:left-0 before:top-2 before:size-3 before:rounded-xs before:bg-primary"
            >
              {formatOffPeriod(off.startDate, off.endDate, props.today)}
              {off.type === 'doctor'
                ? ` ${getOffSessionLabel(off.session)}`
                : ''}
              {off.note ? ` · ${off.note}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
