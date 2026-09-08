'use client';

import { saveContent, type ContentActionState } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useActionState } from 'react';

const initialState: ContentActionState = {};

type Props = { initialKey?: string; initialValue?: string };

export default function ContentForm({ initialKey = '', initialValue = '' }: Props) {
  const [state, action, pending] = useActionState(saveContent, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>콘텐츠 저장</CardTitle>
        <CardDescription>
          동일한 키를 다시 저장하면 새 버전과 수정 이력이 자동으로 생성됩니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#3F3F46]">콘텐츠 키</span>
            <Input name="key" defaultValue={initialKey} placeholder="home.hero.title" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#3F3F46]">내용</span>
            <Textarea
              name="value"
              defaultValue={initialValue}
              rows={7}
              placeholder="홈페이지에서 사용할 콘텐츠를 입력하세요."
            />
          </label>

          {state.error ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
          ) : null}
          {state.success ? (
            <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{state.success}</p>
          ) : null}

          <Button type="submit" disabled={pending}>
            {pending ? '저장 중...' : '저장 및 이력 남기기'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
