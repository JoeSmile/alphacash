import { getCashLoanProductConfig, getApplyCheckParams,getApplyCreateBill } from '../mine';
import { mutationFactory } from './base';

export function useGetCashLoanProductConfig () {
  return mutationFactory(getCashLoanProductConfig);
}

export function useGetApplyCheckParams () {
  return mutationFactory(getApplyCheckParams);
}

export function useGetApplyCreateBill () {
  return mutationFactory(getApplyCreateBill);
}