export const getCurrentMonth = (date = new Date()) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
    .toJSON()
    .split('T')[0]
  let end = date
  end.setDate(end.getDate() + 1)
  end = end.toJSON().split('T')[0]
  return { start, end }
}
