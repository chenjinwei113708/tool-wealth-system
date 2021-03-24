export const CashStatusTypes = [
  {
    value: 0,
    label: '审核成功',
  },
  {
    value: 1,
    label: '待审核',
  },
  {
    value: 2,
    label: '审核失败',
  }
]

export const CashStatusMap = CashStatusTypes.reduce((obj, item) => {
  obj[item.value] = item.label;
  return obj;
}, {} as { [key: string]: string })