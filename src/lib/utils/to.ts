const to = async <T>(promise: Promise<T>): Promise<[T, null] | [null, Error]> => {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    return [null, error as Error]
  }
}

export default to
