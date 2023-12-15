export const getOffset = (currentPage: number = 1, listPerPage: number) => {
  return (currentPage - 1) * listPerPage
}

export const emptyOrRows = (rows: number) => {
  if (!rows) return []

  return rows
}

export const stringify = (object: object) => {
  let cache: any[] | null = []
  const str = JSON.stringify(object, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache?.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return
      }
      // Store value in our collection
      cache.push(value)
    }
    return value
  })
  cache = null // reset the cache
  return str
}

export function formatResponse(statusCode: number, isError: boolean, message: string, data?: object) {
  const response = {
    statusCode,
    isError,
    message,
    object: data
  }
  if (isError) {
    delete response.object
  }
  return response
}

export function ApiError(isError: boolean, statusCode: number, message: string) {
  const error = {
    isError: isError,
    statusCode: statusCode,
    message: message
  }

  return error
}
