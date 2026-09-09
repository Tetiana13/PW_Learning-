export enum PaymentMethod {
  BankTransfer = 'bank-transfer',
  CashOnDelivery = 'cash-on-delivery',
  CreditCard = 'credit-card',
  BuyNowPayLater = 'buy-now-pay-later',
  GiftCard = 'gift-card',
}

function getExpirationDate(): string {
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);

  const month = String(expirationDate.getMonth() + 1).padStart(2, '0');
  return `${month}/${expirationDate.getFullYear()}`;
}

export const testCard = {
  cardNumber: '1111-1111-1111-1111',
  cvv: '111',
  cardHolderName: 'Test User',
  expirationDate: getExpirationDate(),
};