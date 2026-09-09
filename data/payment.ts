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
  expirationDate: getExpirationDate(),
};