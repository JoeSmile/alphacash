import { getCashLoanProductConfig, getApplyCheckParams,applyCreateBill } from '../mine';
import { mutationFactory } from './base';

export function useGetCashLoanProductConfig () {
  return mutationFactory(getCashLoanProductConfig);
}

export function useGetApplyCheckParams () {
  return mutationFactory(getApplyCheckParams);
}

export function useApplyCreateBill () {
  return mutationFactory(applyCreateBill);
}