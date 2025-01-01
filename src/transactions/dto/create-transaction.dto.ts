export class CreateTransactionDto {
  name: string = '';
  description: string = '';
  amount: number = 0;
  userIds: number[] = [];
}
