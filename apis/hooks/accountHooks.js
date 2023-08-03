import { addAccount, deleteEWalletAccount, deleteBankAccount, getAccounts, getBankList, updateAccount } from '../mine';
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

export function useBankList () {
  return mutationFactory(getBankList);
}

export function useUpdateAccount () {
  return mutationFactory(updateAccount);
}


