export const LOAN_STATUS = {
  checking: 101,
  refused: 102,
  cancel: 103,
  transferring: 201,
  failed: 202,
  using: 301,
  overdue: 303,
  repaid: 501,
};

export const statusToImg = {
  [LOAN_STATUS.checking]: require("@assets/bills/loan_tag_under_review.png"),
  [LOAN_STATUS.refused]: require("@assets/bills/loan_tag_reject.png"),
  [LOAN_STATUS.transferring]: require("@assets/bills/loan_tag_disbursing.png"),
  [LOAN_STATUS.failed]: require("@assets/bills/loan_tag_failed.png"),
  [LOAN_STATUS.using]: require("@assets/bills/loan_tag_approved.png"),
  [LOAN_STATUS.overdue]: require("@assets/bills/loan_tag_overdue.png"),
  [LOAN_STATUS.repaid]: require("@assets/bills/loan_tag_repaid.png"),
  [LOAN_STATUS.cancel]: require("@assets/bills/loan_tag_reject.png"),
};

export const statusToImgLeft = {
  [LOAN_STATUS.checking]: require("@assets/bills/loan_tag_under_review_left.png"),
  [LOAN_STATUS.refused]: require("@assets/bills/loan_tag_reject_left.png"),
  [LOAN_STATUS.transferring]: require("@assets/bills/loan_tag_disbursing_left.png"),
  [LOAN_STATUS.failed]: require("@assets/bills/loan_tag_failed_left.png"),
  [LOAN_STATUS.using]: require("@assets/bills/loan_tag_approved_left.png"),
  [LOAN_STATUS.overdue]: require("@assets/bills/loan_tag_overdue_left.png"),
  [LOAN_STATUS.repaid]: require("@assets/bills/loan_tag_repaid_left.png"),
  [LOAN_STATUS.cancel]: require("@assets/bills/loan_tag_reject_left.png"),
};

export const getStatusImgByLocale = (status, locale='en') => {
  return locale == 'en' ? statusToImg[status] : statusToImgLeft[status];
}