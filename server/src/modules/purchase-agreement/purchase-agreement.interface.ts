export interface PurchaseAgreementDTO {
  sellerID: number;
  buyerID: number;
  flatID: number;
  description: string;
  date: Date | string;
}

export interface PurchaseAgreementDTOWithProvider extends PurchaseAgreementDTO {
  provider: string;
}

export default interface PurchaseAgreement extends PurchaseAgreementDTO {
  purchaseAgreementID: number;
}
