'use client';

import { createDoctor } from '@/app/admin/_actions/doctor';
import { Button } from '@/_shadcn/ui/button';
import { Input } from '@/_shadcn/ui/input';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function CreateDoctorForm() {
  const router = useRouter();
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('원장');
  const [department, setDepartment] = useState('혈관외과 전문의');
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const submit = () => {
    setMessage('');

    startTransition(async () => {
      const result = await createDoctor({
        slug,
        name,
        position,
        department,
      });

      if (!result.ok || !result.doctorId) {
        setMessage(result.error ?? '의료진을 추가하지 못했습니다.');
        return;
      }

      router.push(`/admin/doctors/${result.doctorId}`);
      router.refresh();
    });
  };

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr_1.4fr_auto]">
      <Input
        id="admin-doctor-create-slug"
        name="doctorCreateSlug"
        value={slug}
        onChange={(event) => setSlug(event.target.value)}
        placeholder="slug (예: hong-gildong)"
      />
      <Input
        id="admin-doctor-create-name"
        name="doctorCreateName"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="성명"
      />
      <Input
        id="admin-doctor-create-position"
        name="doctorCreatePosition"
        value={position}
        onChange={(event) => setPosition(event.target.value)}
        placeholder="직책"
      />
      <Input
        id="admin-doctor-create-department"
        name="doctorCreateDepartment"
        value={department}
        onChange={(event) => setDepartment(event.target.value)}
        placeholder="진료과/전문의"
      />
      <Button
        disabled={isPending || !slug.trim() || !name.trim()}
        onClick={submit}
      >
        {isPending ? '추가 중...' : '의료진 추가'}
      </Button>

      {message ? (
        <p className="text-sm text-red-600 md:col-span-2 xl:col-span-5">
          {message}
        </p>
      ) : null}
    </div>
  );
}
