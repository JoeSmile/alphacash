import { getReferenceContactDetail, updateReferenceContact, getReferenceContactOptions } from '../mine';
import { mutationFactory } from './base';

// job form
export function useGetReferenceContactOptions () {
  return mutationFactory(getReferenceContactOptions);
}

export function useGetReferenceContactDetail () {
  return mutationFactory(getReferenceContactDetail);
}

export function useUpdateReferenceContact () {
  return mutationFactory(updateReferenceContact);
}
