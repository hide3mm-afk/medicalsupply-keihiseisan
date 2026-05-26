"use server";

export interface ContactFormData {
  inquiryType: string;
  name: string;
  organization: string;
  position: string;
  phone: string;
  email: string;
  message: string;
}

export async function submitContactForm(formData: FormData): Promise<{ success: boolean; message: string }> {
  const data: ContactFormData = {
    inquiryType: (formData.get("inquiryType") as string) ?? "",
    name: (formData.get("name") as string) ?? "",
    organization: (formData.get("organization") as string) ?? "",
    position: (formData.get("position") as string) ?? "",
    phone: (formData.get("phone") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    message: (formData.get("message") as string) ?? "",
  };

  if (!data.name || !data.phone || !data.email) {
    return { success: false, message: "必須項目を入力してください。" };
  }

  // TODO: ここにメール送信処理を実装してください
  // 参考: https://resend.com/docs/send-with-nextjs
  console.log("[Contact Form] 送信内容:", data);

  return { success: true, message: "お問い合わせを受け付けました。担当者よりご連絡いたします。" };
}
