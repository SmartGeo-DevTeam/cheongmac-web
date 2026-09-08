'use client';

import { saveContent, type ContentActionState } from './actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useActionState } from 'react';

const initialState: ContentActionState = {};

type Props = { initialKey?: string; initialValue?: string };

export default function ContentForm({
  initialKey = '',
  initialValue = '',
}: Props) {
  const [state, action, pending] = useActionState(saveContent, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>콘텐츠 저장</CardTitle>
        <CardDescription>
          관리 항목 이름이 같으면 기존 내용을 수정하고, 이전 내용은 변경 기록으로 남습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#3F3F46]">
              관리 항목 이름
            </span>
            <Input
              name="key"
              defaultValue={initialKey}
              placeholder="예: home.hero.title"
            />
            <span className="mt-1.5 block text-xs leading-5 text-[#A1A1AA]">
              어떤 위치의 내용인지 구분하기 위한 이름입니다.
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#3F3F46]">
              내용
            </span>
            <Textarea
              name="value"
              defaultValue={initialValue}
              rows={7}
              placeholder="홈페이지에서 사용할 내용을 입력하세요."
            />
          </label>

          {state.error ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
              {state.error}
            </p>
          ) : null}
          {state.success ? (
            <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {state.success}
            </p>
          ) : null}

          <Button type="submit" disabled={pending}>
            {pending ? '저장 중...' : '저장하기'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
