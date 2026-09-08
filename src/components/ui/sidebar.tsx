import { cn } from '@/_lib/utils';
import Link from 'next/link';
import type { HTMLAttributes, ReactNode } from 'react';

export function SidebarProvider({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="sidebar-provider" className={cn('flex h-full w-full', className)} {...props}>
      {children}
    </div>
  );
}

export function Sidebar({ children, className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <aside
      data-slot="sidebar"
      className={cn('hidden h-full w-[264px] shrink-0 flex-col border-r border-[#E4E4E7] bg-white md:flex', className)}
      {...props}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="sidebar-header" className={cn('p-4', className)} {...props} />;
}

export function SidebarContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="sidebar-content" className={cn('min-h-0 flex-1 overflow-y-auto px-3 py-2', className)} {...props} />;
}

export function SidebarFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="sidebar-footer" className={cn('border-t border-[#E4E4E7] p-4', className)} {...props} />;
}

export function SidebarGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="sidebar-group" className={cn('py-2', className)} {...props} />;
}

export function SidebarGroupLabel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="sidebar-group-label" className={cn('px-2 pb-2 text-xs font-medium text-[#A1A1AA]', className)} {...props} />;
}

export function SidebarMenu({ className, ...props }: HTMLAttributes<HTMLUListElement>) {
  return <ul data-slot="sidebar-menu" className={cn('space-y-1', className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }: HTMLAttributes<HTMLLIElement>) {
  return <li data-slot="sidebar-menu-item" className={cn('list-none', className)} {...props} />;
}

export function SidebarMenuButton({
  href,
  active = false,
  children,
  className,
}: {
  href: string;
  active?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-slot="sidebar-menu-button"
      className={cn(
        'flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-[#52525B] transition-colors hover:bg-[#F4F4F5] hover:text-[#18181B]',
        active && 'bg-[#F4F4F5] text-[#18181B]',
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function SidebarInset({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section data-slot="sidebar-inset" className={cn('flex min-w-0 flex-1 flex-col bg-[#FAFAFA]', className)} {...props} />;
}
