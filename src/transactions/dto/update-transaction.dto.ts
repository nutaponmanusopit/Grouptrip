export class UpdateTransactionDto {
  name: string = '';
  description: string = '';
  amount: number = 0;
  userIds: number[] = [];
}
