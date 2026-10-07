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

import type { KunyeRow, Study, StudyCard, StudyTag, StudyText } from './types'

// Iki dile ayni metni koyan kucuk yardimci. Yer tutucunun detay sayfasi
// olmadigi icin lede ve kunye hic gorunmez, tip istedigi icin dolu duruyor.
function lorem(title: string, card: StudyCard): Record<'tr' | 'en', StudyText> {
  const text: StudyText = { title, lede: card.lead, kunye: [], card }
  return { tr: text, en: text }
}

function placeholder(number: string, title: string, year: number, tags: StudyTag[], card: StudyCard): Study {
  return { slug: `lorem-${number}`, number, year, tags, text: lorem(title, card), placeholder: true }
}

const featureFacts: KunyeRow[] = [
  { label: 'Girdi', value: 'Lorem ipsum dolor sit' },
  { label: 'Yöntem', value: 'Consectetur adipiscing' },
  { label: 'Çıktı', value: 'Sed do eiusmod tempor' },
  { label: 'Veri', value: 'Incididunt ut labore' },
  { label: 'Süre', value: 'Et dolore magna' },
  { label: 'Doğrulama', value: 'Ut enim ad minim' },
]

export const placeholders: Study[] = [
  {
    ...placeholder('00', 'Lorem Ipsum Dolor', 2026, ['preparation', 'analysis'], {
      lead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      body: [
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      ],
    }),
    feature: {
      facts: {
        tr: featureFacts,
        en: featureFacts.map((row, i) => ({ ...row, label: ['Input', 'Method', 'Output', 'Data', 'Duration', 'Validation'][i] })),
      },
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
