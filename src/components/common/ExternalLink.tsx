"use client";

import type { MouseEvent, ReactNode } from "react";

export const DUMMY_LINK_EVENT = "dummy-link";

type Props = {
  href: string;
  className?: string;
  "aria-label"?: string;
  tabIndex?: number;
  onClick?: () => void;
  children: ReactNode;
};

/**
 * 外部サービス（Instagram・LINE・Uber Eats）へのリンク。
 * 架空の店なので URL は "#"。押してもページは動かさず、DummyNotice に「リンク先はありません」と出させる。
 * store.json / nav.json に本物の URL を入れれば、別タブで開く普通のリンクになる
 */
export default function ExternalLink({ href, className, "aria-label": ariaLabel, tabIndex, onClick, children }: Props) {
  const isDummy = href === "#";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isDummy) {
      e.preventDefault();
      window.dispatchEvent(new Event(DUMMY_LINK_EVENT));
    }
    onClick?.();
  };

  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      onClick={handleClick}
      {...(isDummy ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}
