import { X } from 'lucide-react';
import { FacilityType } from '../data';

type Props = {
  facility: FacilityType;
  onClose: () => void;
};

export default function FacilityModal({ facility, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      {/* 배경 영역 */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
        aria-label="팝업 닫기"
      />

      {/* 팝업 콘텐츠 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="facility-modal-title"
        className="relative z-10 w-full max-w-3xl rounded-2xl bg-white p-5"
      >
        <div className="flex items-center justify-between">
          <h2 id="facility-modal-title">
            {facility.floor.code} {facility.detail?.title ?? facility.name}
          </h2>

          <button type="button" onClick={onClose} aria-label="닫기">
            <X className="size-6" />
          </button>
        </div>

        {/* 이 아래부터 직접 팝업 UI 구현 */}
        <div className="mt-5">
          <p>{facility.detail?.description}</p>
        </div>
      </div>
    </div>
  );
}
