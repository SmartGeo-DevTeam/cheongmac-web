import ClinicDiseaseBodyMap from '@/app/_components/clinic/diseases/body-map';
import { arterialDiseasePoints } from '@/app/_data/vascular/arterial/diseases/map';

/** 인체 이미지·좌표만 다르게 전달하고 나머지 지도 UI는 공통으로 사용합니다. */
export default function ArterialDiseaseMap() {
  return (
    <ClinicDiseaseBodyMap
      id="vascular-arterial-diseases-map"
      points={arterialDiseasePoints}
      image="/vascular/arterial/artery-body.png"
      imageAlt="전신 동맥 구조 이미지"
      imageWidth={612}
      imageHeight={1438}
    />
  );
}
