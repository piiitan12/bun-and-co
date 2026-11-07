import Link from "next/link";
import type { NavItem } from "@/types/data";
import styles from "./DrawerNav.module.scss";

type Props = { id: string; open: boolean; items: NavItem[]; onClose: () => void };

/** SP 用ドロワー。Header と同じ nav データを受け取る */
export default function DrawerNav({ id, open, items, onClose }: Props) {
  return (
    <div id={id} className={`${styles.drawer} ${open ? styles.isOpen : ""}`} aria-hidden={!open}>
      <nav aria-label="メニュー">
        <ul className={styles.list}>
          {items.map((item) =>
            item.href.startsWith("/") ? (
              <li key={item.href}>
                <Link href={item.href} className={styles.link} onClick={onClose} tabIndex={open ? 0 : -1}>
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.label}>
                <a href={item.href} className={`${styles.link} ${styles.external}`} onClick={onClose} tabIndex={open ? 0 : -1}>
                  {item.label}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>
    </div>
  );
}
