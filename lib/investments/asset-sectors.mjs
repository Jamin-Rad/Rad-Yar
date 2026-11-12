import { CATEGORY_LABELS } from './portfolio.mjs'

export const ASSET_SECTORS = {
  technology: { label: 'فناوری', color: '#a8ce90' },
  communications: { label: 'ارتباطات و رسانه', color: '#82adcb' },
  consumer: { label: 'کالاهای مصرفی و خودرو', color: '#e7bf76' },
  staples: { label: 'کالاهای مصرفی ضروری', color: '#e5a49e' },
  finance: { label: 'خدمات مالی', color: '#b3a2d8' },
  health: { label: 'سلامت', color: '#74c8bb' },
  cleanEnergy: { label: 'گذار انرژی', color: '#b4cc74' },
  materials: { label: 'مواد اولیه و ساختمانی', color: '#cd9b73' },
  industrials: { label: 'صنعت و حمل‌ونقل', color: '#8296d4' },
  fund: { label: CATEGORY_LABELS.fund, color: '#85c8e3' },
  metal: { label: CATEGORY_LABELS.metal, color: '#b9c2cc' },
  stock: { label: 'سهام دسته‌بندی‌نشده', color: '#a5a5a5' },
  other: { label: CATEGORY_LABELS.other, color: '#aaa0bf' },
}

export function assetSector(position, assignments) {
  const sector = assignments?.[position.isin]
  if (Object.hasOwn(ASSET_SECTORS, sector)) return sector
  return Object.hasOwn(CATEGORY_LABELS, position.category) ? position.category : 'other'
}
