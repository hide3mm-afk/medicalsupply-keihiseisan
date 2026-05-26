// このファイルを編集すると製品・サービスページのテキストが変わります

export const servicesPageContent = {
  pageTitle: "製品・サービス",
  pageSubtitle: "医療現場のニーズに応える製品・サービスをご提供しています",

  geUltrasound: {
    id: "ge-ultrasound",
    badge: "GEヘルスケア・ジャパン株式会社 特約販売店",
    heading: "GE超音波診断装置",
    lead: "さまざまなシーンでお使いいただける超音波画像診断装置をご提案します",
    products: [
      {
        id: "logiq",
        name: "LOGIQ シリーズ",
        subtitle: "総合診療科向け",
        description:
          "内科・循環器・整形外科。汎用機から専門機まで幅広いラインナップで、あらゆる診療科のニーズにお応えします。",
        image: "/images/products/logiq.jpg", // ← 画像を差し替える場合はこのパスを変更してください
      },
      {
        id: "voluson",
        name: "VOLUSON シリーズ",
        subtitle: "産婦人科向け",
        description:
          "2D/3D/4D対応。命をリアルに描き出す高画質で、産婦人科医師・患者様双方に安心を提供します。",
        image: "/images/products/voluson.jpg",
      },
      {
        id: "vscan",
        name: "Vscan",
        subtitle: "在宅・病棟・救急向け",
        description:
          "ポータブル・ハンドキャリー。コンパクトで高感度カラードプラを搭載し、場所を選ばず活躍します。",
        image: "/images/products/vscan.jpg",
      },
      {
        id: "logiq-vet",
        name: "LOGIQ（動物病院向け）",
        subtitle: "獣医療向け",
        description:
          "動物病院・ペットクリニック・動物園・水族館での導入実績多数。獣医療の現場もサポートします。",
        image: "/images/products/logiq-vet.jpg",
      },
    ],
  },

  amethyst: {
    id: "amethyst",
    badge: "大衛株式会社（アメジスト）取扱代理店",
    heading: "医療材料・医療機器（アメジスト）",
    lead: "産科・医療の現場で使われる高品質な衛生医療用品を取り扱っています",
    mainProduct: {
      name: "オサンセット（お産セット）",
      description: "産院・助産院向けにカスタマイズ可能なお産用品セット",
      contents: [
        "オサンパッド（L/M/S）",
        "産褥ショーツ",
        "収納バッグ",
        "清浄綿",
        "※内容品はカスタマイズ可能です",
      ],
    },
    otherProducts: ["ガーゼ・脱脂綿", "包帯・絆創膏", "感染対策用品", "産科婦人科用品"],
  },

  clinicSupport: {
    id: "clinic-support",
    heading: "クリニック開業支援",
    lead: "医療機器の選定から導入後のサポートまで、開業を一貫してお手伝いします",
    steps: [
      { step: 1, title: "ヒアリング・コンセプト整理", description: "診療科・診療スタイル・患者層に合わせた機器選定の方向性を整理します。" },
      { step: 2, title: "機器選定・お見積もり", description: "最適な機器をご提案し、詳細なお見積もりを作成いたします。" },
      { step: 3, title: "ファイナンス・購入方法のご相談", description: "リース・割賦・現金購入など、お客様に合ったお支払い方法をご提案します。" },
      { step: 4, title: "設置・導入・スタッフトレーニング", description: "導入後のトレーニングまで一貫してサポートいたします。" },
      { step: 5, title: "アフターサービス・定期メンテナンス", description: "導入後も継続的なサポートで安心の医療環境を維持します。" },
    ],
    cta: { label: "開業相談はこちら", href: "/contact" },
  },

  opus: {
    id: "opus",
    heading: "超音波シミュレータ OPUS",
    lead: "実機を使わずに、安全・効率的にエコー技術を習得",
    features: [
      "産婦人科・研修医・超音波技師の教育用途に最適",
      "症例数に左右されない安定したトレーニング環境",
      "繰り返し練習できるシミュレーション機能",
      "産科・婦人科領域に特化したプログラム",
    ],
  },
};
