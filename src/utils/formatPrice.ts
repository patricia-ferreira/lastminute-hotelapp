import * as RNLocalize from 'react-native-localize';

export function formatPrice(amount: number, currency: string): string {
  const locales = RNLocalize.getLocales();
  const locale = locales.length > 0 ? locales[0].languageTag : 'pt-PT';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}