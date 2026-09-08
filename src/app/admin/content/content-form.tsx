'use client';

import { saveContent, type ContentActionState } from './actions';
import { useActionState } from 'react';

const initialState: ContentActionState = {};

type Props = { initialKey?: string; initialValue?: string };

export default function ContentForm({ initialKey = '', initialValue = '' }: Props) {
  const [state, action, pending] = useActionState(saveContent, initialState);

  return (
    <form action={action} className="rounded-2xl bg-white p-5 shadow-sm xl:p-6">
      <div className="grid gap-4">
        <label>
          <span className="mb-2 block text-sm font-semibold text-[#444444]">콘텐츠 키</span>
          <input name="key" defaultValue={initialKey} placeholder="home.hero.title" className="h-12 w-full rounded-xl border border-[#DDDFE1] px-4" />
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold text-[#444444]">내용</span>
          <textarea name="value" defaultValue={initialValue} rows={5} className="w-full resize-y rounded-xl border border-[#DDDFE1] p-4 leading-6" />
        </label>
      </div>
      {state.error ? <p className="mt-3 text-sm text-red-600">{state.error}</p> : null}
      {state.success ? <p className="mt-3 text-sm text-emerald-700">{state.success}</p> : null}
      <button disabled={pending} className="mt-4 rounded-xl bg-cm-green px-5 py-3 text-sm font-bold text-white disabled:opacity-60">
        {pending ? '저장 중...' : '저장 및 이력 남기기'}
      </button>
    </form>
  );
}
