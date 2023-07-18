import { addAccount, deleteEWalletAccount, deleteBankAccount, getAccounts } from '../mine';
import { mutationFactory } from './base';

// account form
export function useAddAccount () {
  return mutationFactory(addAccount);
}

export function useDeleteEWalletAccount () {
  return mutationFactory(deleteEWalletAccount);
}
export function useDeleteBankAccount () {
  return mutationFactory(deleteBankAccount);
}
export function useGetAccounts () {
  return mutationFactory(getAccounts);
}