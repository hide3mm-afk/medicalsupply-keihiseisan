"use client";

import { useState } from "react";
import { submitContactForm } from "./actions";

// お問い合わせ種別 — 変更したい場合はここを修正してください
const inquiryTypes = [
  "製品・購入のご相談",
  "お見積もり依頼",
  "クリニック開業相談",
  "OPUS（シミュレータ）のご相談",
  "その他",
] as const;

const inputClass = "w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const result = await submitContactForm(new FormData(e.currentTarget));
    if (result.success) { setSubmitted(true); } else { setError(result.message); }
    setIsSubmitting(false);
  }

  return (
    <>
      <div className="bg-primary pt-16 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">お問い合わせ</h1>
          <p className="text-blue-200">Contact Us</p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        {submitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-primary">送信完了</h2>
            <p className="mb-6 text-gray-600">お問い合わせを受け付けました。担当者よりご連絡いたします。</p>
            <a href="/" className="text-sm font-medium text-primary-mid transition-colors hover:text-primary">
              トップページへ戻る →
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            {/* お問い合わせ種別 */}
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-gray-700">
                お問い合わせ種別 <span className="text-red-500">*</span>
              </legend>
              <div className="space-y-2">
                {inquiryTypes.map((type, i) => (
                  <label key={type} className="flex cursor-pointer items-center gap-3">
                    <input type="radio" name="inquiryType" value={type} defaultChecked={i === 0}
                      className="text-primary focus:ring-primary" />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                お名前 <span className="text-red-500">*</span>
              </label>
              <input id="name" name="name" type="text" required placeholder="山田 太郎" className={inputClass} />
            </div>

            <div>
              <label htmlFor="organization" className="mb-1 block text-sm font-medium text-gray-700">所属機関・病院名</label>
              <input id="organization" name="organization" type="text" placeholder="○○病院" className={inputClass} />
            </div>

            <div>
              <label htmlFor="position" className="mb-1 block text-sm font-medium text-gray-700">役職・診療科</label>
              <input id="position" name="position" type="text" placeholder="内科部長" className={inputClass} />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
                電話番号 <span className="text-red-500">*</span>
              </label>
              <input id="phone" name="phone" type="tel" required placeholder="045-000-0000" className={inputClass} />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input id="email" name="email" type="email" required placeholder="example@hospital.jp" className={inputClass} />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">お問い合わせ内容</label>
              <textarea id="message" name="message" rows={6} placeholder="ご質問・ご要望をご記入ください"
                className={`${inputClass} resize-none`} />
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full rounded bg-primary py-3 font-medium text-white transition-colors hover:bg-primary-mid disabled:cursor-not-allowed disabled:opacity-50">
              {isSubmitting ? "送信中..." : "送信する"}
            </button>
            <p className="text-center text-xs text-gray-500">
              ご入力いただいた個人情報は、お問い合わせへの回答にのみ使用いたします。
            </p>
          </form>
        )}
      </div>
    </>
  );
}
