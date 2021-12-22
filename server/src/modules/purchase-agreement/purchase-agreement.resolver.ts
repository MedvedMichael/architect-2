import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CacheService } from '../cache/cache.service';
import { FlatBuilder } from '../flats/flat-builder';
import { FlatsService } from '../flats/flats.service';
import PurchaseAgreement, {
  PurchaseAgreementDTO,
  PurchaseAgreementDTOWithProvider,
} from './purchase-agreement.interface';
import { PurchaseAgreementService } from './purchase-agreement.service';

@Resolver()
export class PurchaseAgreementResolver {
  constructor(
    private purchaseAgreementService: PurchaseAgreementService,
    private flatsService: FlatsService,
  ) {}

  @Query('getAgreementByID')
  async getAgreementByID(
    @Args('agreementID') purchaseAgreementID: number,
  ): Promise<PurchaseAgreement> {
    const res = await this.purchaseAgreementService.getAgreementByID(
      purchaseAgreementID,
    );
    if(!res) throw new NotFoundException()
    return { ...res, date: new Date(res.date).toISOString() };
  }

  @Mutation('createAgreement')
  async createAgreement(
    @Args('input') purchaseAgreementDTO: PurchaseAgreementDTOWithProvider,
  ): Promise<PurchaseAgreement> {
    const { provider, ...dto } = purchaseAgreementDTO;
    const flatBuilder = new FlatBuilder();
    const oldFlat = await flatBuilder.getFlat(
      purchaseAgreementDTO.flatID,
      purchaseAgreementDTO.provider,
    );
    let { flatID, userID } = oldFlat;
    if (provider !== 'server') {
      const { flatID: _, provider: __, flatID: ___, ...flatDTO } = oldFlat;
      flatID = await this.flatsService.createFlat({
        ...flatDTO,
        userID: purchaseAgreementDTO.sellerID,
      });
    }

    const purchaseAgreementID =
      await this.purchaseAgreementService.createNewAgreement({
        ...dto,
        flatID,
      });

    return { ...dto, purchaseAgreementID, flatID };
  }

  @Mutation('updateAgreement')
  async updateAgreement(
    @Args('input') agreementDTO: PurchaseAgreementDTO,
    @Args('agreementID') agreementID: number,
  ): Promise<void> {
    this.purchaseAgreementService.updateAgreement(agreementID, agreementDTO);
  }

  @Mutation('deleteAgreement')
  async deleteAgreement(
    @Args('agreementID') agreementID: number,
  ): Promise<void> {
    this.purchaseAgreementService.deleteAgreement(agreementID);
  }
}
