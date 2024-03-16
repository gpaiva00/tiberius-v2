function getRandomString(data: string[]): string {
  const randomIndex = Math.floor(Math.random() * data.length)

  return data[randomIndex]
}

export { getRandomString }
