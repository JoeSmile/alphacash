import { getCashLoanProductConfig, getApplyLoanVoice } from '../mine';
import { mutationFactory } from './base';

export function useGetCashLoanProductConfig () {
  return mutationFactory(getCashLoanProductConfig);
}

export function useGetApplyLoanVoice () {
  return mutationFactory(getApplyLoanVoice);
}