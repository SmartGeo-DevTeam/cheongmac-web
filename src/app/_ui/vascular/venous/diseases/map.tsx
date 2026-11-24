import ClinicDiseaseBodyMap from '@/app/_components/clinic/diseases/body-map';
import { venousDiseasePoints } from '@/app/_data/vascular/venous/diseases/map';

/** 인체 이미지·좌표만 다르게 전달하고 나머지 지도 UI는 공통으로 사용합니다. */
export default function VenousDiseaseMap() {
  return (
    <ClinicDiseaseBodyMap
      id="vascular-venous-diseases-map"
      points={venousDiseasePoints}
      image="/vascular/venous/diseases/venous-body.png"
      imageAlt="전신 정맥 구조 이미지"
      imageWidth={306}
      imageHeight={719}
    />
  );
}
