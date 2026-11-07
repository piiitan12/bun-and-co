"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "./ContactForm.module.scss";

type Field = "name" | "email" | "tel" | "message" | "agree";
type Errors = Partial<Record<Field, string>>;

const TOPICS = ["ご予約について", "お店・メニューについて", "取材・撮影のご依頼", "その他"];

/** お問い合わせフォーム。架空の店なので送信先は持たず、送信後は「作品のため実際には送信されない」と表示する。
 *  元テーマは Contact Form 7（プラグイン）。ここでは入力の確認だけを自前で行い、エラーは欄の下に出して読み上げにも伝える */
export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(data: FormData): Errors {
    const e: Errors = {};
    if (!String(data.get("name") ?? "").trim()) e.name = "お名前を入力してください";
    const email = String(data.get("email") ?? "").trim();
    if (!email) e.email = "メールアドレスを入力してください";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "メールアドレスの形式を確かめてください";
    const tel = String(data.get("tel") ?? "").trim();
    if (tel && !/^[0-9-]{10,13}$/.test(tel)) e.tel = "電話番号は数字とハイフンで入力してください";
    if (!String(data.get("message") ?? "").trim()) e.message = "お問い合わせ内容を入力してください";
    if (!data.get("agree")) e.agree = "プライバシーポリシーへの同意が必要です";
    return e;
  }

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const found = validate(new FormData(ev.currentTarget));
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      ev.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className={styles.done} role="status">
        <p className={styles.doneTitle}>送信しました</p>
        <p>お問い合わせありがとうございます。内容を確認のうえ、3 営業日以内にご連絡します。</p>
        <p className={styles.doneNote}>※ このサイトは制作実績として公開している作品のため、実際には送信されません。</p>
      </div>
    );
  }

  const describe = (f: Field) => (errors[f] ? `${f}-error` : undefined);
  const error = (f: Field) =>
    errors[f] && (
      <p id={`${f}-error`} className={styles.error}>
        {errors[f]}
      </p>
    );

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          お名前<span className={styles.req}>必須</span>
        </label>
        <input id="name" name="name" type="text" autoComplete="name" className={styles.input} aria-invalid={!!errors.name} aria-describedby={describe("name")} />
        {error("name")}
      </div>
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          メールアドレス<span className={styles.req}>必須</span>
        </label>
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" className={styles.input} aria-invalid={!!errors.email} aria-describedby={describe("email")} />
        {error("email")}
      </div>
      <div className={styles.field}>
        <label htmlFor="tel" className={styles.label}>
          電話番号<span className={styles.opt}>任意</span>
        </label>
        <input id="tel" name="tel" type="tel" inputMode="tel" autoComplete="tel" placeholder="例：090-1234-5678" className={styles.input} aria-invalid={!!errors.tel} aria-describedby={describe("tel")} />
        {error("tel")}
      </div>
      <div className={styles.field}>
        <label htmlFor="topic" className={styles.label}>
          お問い合わせの種類
        </label>
        <select id="topic" name="topic" className={styles.input} defaultValue={TOPICS[0]}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          お問い合わせ内容<span className={styles.req}>必須</span>
        </label>
        <textarea id="message" name="message" rows={6} className={styles.input} aria-invalid={!!errors.message} aria-describedby={describe("message")} />
        {error("message")}
      </div>
      <div className={styles.field}>
        <label className={styles.check}>
          <input type="checkbox" name="agree" aria-invalid={!!errors.agree} aria-describedby={describe("agree")} />
          <span>
            <Link href="/privacy-policy" className={styles.link}>
              プライバシーポリシー
            </Link>
            に同意する
          </span>
        </label>
        {error("agree")}
      </div>
      <button type="submit" className={styles.submit}>
        この内容で送信する
      </button>
    </form>
  );
}
