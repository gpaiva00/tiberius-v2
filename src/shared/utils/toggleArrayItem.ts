function toggleArrayItem<T>(arr: Array<T>, item: T): Array<T> {
  const _arr = [...arr]
  return _arr.includes(item) ? _arr.filter((i) => i !== item) : [..._arr, item]
}

export { toggleArrayItem }
