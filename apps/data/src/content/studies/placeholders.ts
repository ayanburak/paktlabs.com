/*
file: placeholders.ts
importable: placeholders

Mockup'taki lorem kartlarinin canliya tasinmis hali. Veri sayfasinin tasarimi
gercek bir listeyle sinanabilsin diye var. Hepsi placeholder isaretli, detay
ve kod sayfalari bulunamadi sayfasina duser. Gercek bir calisma geldiginde
ayni numarali yer tutucu buradan silinir.

description: Veri sayfasindaki listede gorunen lorem ipsum yer tutucu calismalari tutan modul.
*/

// NOTE: Yer tutucularin metni iki dilde ayni, lorem ipsum'un cevirisi yok.
// Bu dosya tamamen bosaldiginda silinmeli, index.ts'teki import'u da onunla
// birlikte kalkar.

import type { KunyeRow, Localized, PlaceholderStudy, StudyTag } from './types'

// Ayni metni iki dile birden koyar. Lorem ipsum'un cevirisi olmadigi icin yer
// tutucularin butun metinleri bundan gecer.
function lorem(text: string): Localized {
  return { tr: text, en: text }
}

// Kart metni duz metin olarak alinir ve iki dile cevrilir, boylece listedeki
// her yer tutucu tek dilde yazilabiliyor.
function placeholder(
  number: string,
  title: string,
  year: number,
  tags: StudyTag[],
  card: { lead: string; body: string[] },
): PlaceholderStudy {
  return {
    slug: `lorem-${number}`,
    number,
    year,
    tags,
    title: lorem(title),
    card: { lead: lorem(card.lead), body: card.body.map(lorem) },
    placeholder: true,
  }
}

// Etiketler gercek etiketler gibi iki dilde yazili, degerler lorem.
const featureFacts: KunyeRow[] = [
  { label: { tr: 'Girdi', en: 'Input' }, value: lorem('Lorem ipsum dolor sit') },
  { label: { tr: 'Yöntem', en: 'Method' }, value: lorem('Consectetur adipiscing') },
  { label: { tr: 'Çıktı', en: 'Output' }, value: lorem('Sed do eiusmod tempor') },
  { label: { tr: 'Veri', en: 'Data' }, value: lorem('Incididunt ut labore') },
  { label: { tr: 'Süre', en: 'Duration' }, value: lorem('Et dolore magna') },
  { label: { tr: 'Doğrulama', en: 'Validation' }, value: lorem('Ut enim ad minim') },
]

export const placeholders: PlaceholderStudy[] = [
  {
    ...placeholder('00', 'Lorem Ipsum Dolor', 2026, ['preparation', 'analysis'], {
      lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      body: [
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      ],
    }),
    feature: {
      facts: featureFacts,
      tools: ['Python', 'Pandas', 'PostgreSQL', 'Jupyter'],
    },
  },
  placeholder('02', 'Amet Elit', 2026, ['machineLearning', 'quality'], {
    lead: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    body: [
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    ],
  }),
  placeholder('03', 'Tempor Magna', 2025, ['analysis', 'visualization'], {
    lead: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    body: [
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
  }),
  placeholder('04', 'Labore Aliqua', 2025, ['database', 'quality'], {
    lead: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    ],
  }),
  placeholder('05', 'Veniam Quis', 2024, ['visualization', 'preparation'], {
    lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    body: [
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    ],
  }),
  placeholder('06', 'Nostrud Ullamco', 2024, ['quality', 'database'], {
    lead: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    body: [
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    ],
  }),
]
