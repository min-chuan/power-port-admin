export interface MemberItem {
  memberCardNumber: string; // 会员卡号
  cardType: string; // 卡类型
  issueDate: string; // 开卡日期
  holderName: string; // 持有人姓名
  holderPhone: string; // 持有人电话
  cardBalance: number; // 卡余额
  transactionRecords: {
    // 消费记录
    transactionDate: string; // 消费日期
    transactionAmount: number; // 消费金额
    transactionType: string; // 消费类型
  }[];
  validUntil: string; // 有效期至
}
