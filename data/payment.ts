export enum PaymentMethod {
  BankTransfer = 'bank-transfer',
  CashOnDelivery = 'cash-on-delivery',
  CreditCard = 'credit-card',
  BuyNowPayLater = 'buy-now-pay-later',
  GiftCard = 'gift-card',
}

export const testCard = {
  cardNumber: '1111-1111-1111-1111',
  cvv: '111',
  cardHolderName: 'Test User',

  getExpirationDate(): string {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${month}/${year}`;
  },
};