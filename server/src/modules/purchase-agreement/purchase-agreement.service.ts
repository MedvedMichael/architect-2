import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import PurchaseAgreement, {
  PurchaseAgreementDTO,
} from './purchase-agreement.interface';

@Injectable()
export class PurchaseAgreementService {
  private tableName = 'PurchaseAgreement';
  private pgService = PgService.getInstance();

  async getAgreementByID(
    purchaseAgreementID: number,
  ): Promise<PurchaseAgreement> {
    return this.pgService.findOne({
      tableName: this.tableName,
      where: [{ key: 'purchaseAgreementID', value: purchaseAgreementID }],
    });
  }

  async createNewAgreement(
    agreementDTO: PurchaseAgreementDTO,
  ): Promise<number> {
    const res = await this.pgService.create({
      tableName: this.tableName,
      values: [agreementDTO],
      returning: 'purchaseAgreementID',
    });
    return res.rows[0].purchaseAgreementID;
  }

  async updateAgreement(
    purchaseAgreementID: number,
    purchaseAgreementDTO: PurchaseAgreementDTO,
  ): Promise<void> {
    this.pgService.update({
      tableName: this.tableName,
      updates: { ...purchaseAgreementDTO },
      where: [{ key: 'purchaseAgreementID', value: purchaseAgreementID }],
    });
  }

  async deleteAgreement(purchaseAgreementID: number): Promise<void> {
    this.pgService.delete({
      tableName: this.tableName,
      where: [{ key: 'purchaseAgreementID', value: purchaseAgreementID }],
    });
  }
}
