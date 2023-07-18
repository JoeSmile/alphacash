import { getCashLoanProductConfig } from '../mine';
import { mutationFactory } from './base';

export function useGetCashLoanProductConfig () {
  return mutationFactory(getCashLoanProductConfig);
}