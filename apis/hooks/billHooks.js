import { getBills, getBillDetail } from "../bills";
import { mutationFactory } from "./base";

export function useBillList() {
  const mutations = mutationFactory(getBills);

  return mutations;
}

export function useBillDetail() {
  const mutations = mutationFactory(getBillDetail);

  return mutations;
}
