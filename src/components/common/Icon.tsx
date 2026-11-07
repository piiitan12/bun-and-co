export type IconName = "instagram" | "line" | "location" | "phone" | "clock" | "calendar";

type Props = { name: IconName; size?: number; className?: string };

/** 線のアイコン（自作の SVG）。色は currentColor なので、親の文字色とホバーの変化にそのまま従う。
 *  元テーマは Font Awesome（CDN）と、PHP に直書きした SVG の 2 系統だった。ここでは 1 部品にまとめ、外部の読み込みをなくした */
export default function Icon({ name, size = 20, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

const PATHS: Record<IconName, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  line: (
    <>
      <path d="M12 3.5c-5 0-9 3.2-9 7.2 0 3.6 3.2 6.6 7.5 7.1l-.6 2.7c-.1.4.3.7.7.5l3.6-2.7c3.9-.8 6.8-3.9 6.8-7.6 0-4-4-7.2-9-7.2Z" />
      <path d="M7.2 9v3.6h1.9M10.6 9v3.6M12.6 12.6V9l2.4 3.6V9M18 9h-1.6v3.6H18M16.4 10.8H18" strokeWidth={1.3} />
    </>
  ),
  location: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  phone: (
    <path d="M6.6 3.8 9 3.5l1.6 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.6-.3 2.4a2 2 0 0 1-2.1 1.7C10.5 18.6 5.4 13.5 4.9 5.9a2 2 0 0 1 1.7-2.1Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </>
  ),
};
