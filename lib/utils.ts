import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PRODUCTS, PRICING_TIERS, PricingTier } from "./data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTierForQuantity(quantity: number): PricingTier {
  const qty = Math.max(1, quantity)
  if (qty >= 100) return PRICING_TIERS[4]
  if (qty >= 50) return PRICING_TIERS[3]
  if (qty >= 25) return PRICING_TIERS[2]
  if (qty >= 10) return PRICING_TIERS[1]
  return PRICING_TIERS[0]
}

export function calculateUnitPrice(
  productType: 'pin' | 'magnet' | 'mirror' | 'collage',
  quantity: number = 1,
  shapeOption?: string
): number {
  const product = PRODUCTS.find((p) => p.type === productType);
  let basePrice = product ? product.basePriceAED : 15;

  if (productType === 'collage' && shapeOption) {
    if (shapeOption.includes('2×3') || shapeOption.includes('2x3')) basePrice = 65;
    else if (shapeOption.includes('3×3') || shapeOption.includes('3x3')) basePrice = 90;
    else if (shapeOption.includes('3×4') || shapeOption.includes('3x4')) basePrice = 115;
    else if (shapeOption.includes('4×4') || shapeOption.includes('4x4')) basePrice = 140;
  }

  const tier = getTierForQuantity(quantity);
  const discountedPrice = basePrice * (1 - tier.discountPercentage / 100);
  return Math.round(discountedPrice * 100) / 100;
}

export function calculateTotalPrice(
  productType: 'pin' | 'magnet' | 'mirror' | 'collage',
  quantity: number = 1,
  shapeOption?: string
): number {
  const unitPrice = calculateUnitPrice(productType, quantity, shapeOption);
  return Math.round(unitPrice * quantity * 100) / 100;
}

export function formatAED(amount: number): string {
  return `AED ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}

export function buildWhatsAppLink(details: {
  name?: string
  product?: string
  shape?: string
  quantity?: number
  date?: string
  occasion?: string
  specialInstructions?: string
  message?: string
}): string {
  const phoneNumber = "971554682194" // UAE WhatsApp contact number
  
  let msg = `Hello Printed Memoirs! 👋\n\nI would like to inquire about a custom keepsake order:\n`
  if (details.name) msg += `👤 *Name:* ${details.name}\n`
  if (details.product) msg += `📦 *Product:* ${details.product} (${details.shape || 'Round'})\n`
  if (details.quantity) msg += `🔢 *Quantity:* ${details.quantity} pcs\n`
  if (details.occasion) msg += `🎉 *Event/Occasion:* ${details.occasion}\n`
  if (details.date) msg += `📅 *Required Date:* ${details.date}\n`
  if (details.specialInstructions) msg += `📝 *Instructions:* ${details.specialInstructions}\n`
  if (details.message) msg += `💬 *Message:* ${details.message}\n`
  
  msg += `\nPlease provide a detailed quotation and timeline.`

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`
}

