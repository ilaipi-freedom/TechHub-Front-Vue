export enum OrderFrom {
  XIANYU = '闲鱼',
  TAOBAO = '淘宝',
  WECHAT = '微信',
  WECHAT_MOMENTS = '微信朋友圈',
  FRIEND_RECOMMEND = '好友推荐',
  OTHERS = '其他',
}

export enum OrderStatus {
  '在聊' = 0, // 在聊
  '接单' = 10, // 接单，用户已下单、付款
  '交付' = 20, // 交付，已交付用户
  '未成单' = 99, // 未成单
}

export const getOrderStatusName = (value: number): string => {
  const status = Object.keys(OrderStatus)
    .filter((key) => Number.isNaN(Number(key)))
    .find((key) => OrderStatus[key as keyof typeof OrderStatus] === value);

  return status || '';
};
