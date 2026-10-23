'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbDropdownProps = {
  label: string;
  items: BreadcrumbItem[];
};

export function BreadcrumbDropdown({ label, items }: BreadcrumbDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownId = useId();
  const pathname = usePathname();

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-40
      xl:min-w-25"
    >
      {/* 드롭다운 버튼 */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between items-center gap-2 whitespace-nowrap text-[12px]
        xl:text-[16px]"
      >
        <span>{label}</span>

        <ChevronDown
          className={`size-3.5 transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
            `}
        />
      </button>

      {/* 드롭다운 리스트 */}
      {isOpen && (
        <nav
          id={dropdownId}
          aria-label={`${label} 하위 메뉴`}
          className="absolute left-0 top-full mt-2 py-1 min-w-40 rounded-lg border border-cm-gray-200 bg-white shadow-lg z-50"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
              className="block whitespace-nowrap px-4 py-2.5 text-[14px] text-cm-gray-700 transition hover:bg-cm-gray-50 hover:text-cm-orange
              xl:text-[16px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
