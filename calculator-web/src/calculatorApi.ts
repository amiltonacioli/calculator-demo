import type { CalculateRequest } from './calculatorLogic'

const apiBaseUrl = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(/\/$/, '')
const calculateUrl = `${apiBaseUrl}/calculate`

type CalculateResponse = {
  result: number
}

type ErrorResponse = {
  error?: string
  message?: string
}

export async function calculate(request: CalculateRequest): Promise<number> {
  const response = await fetch(calculateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  const payload = (await response.json()) as CalculateResponse | ErrorResponse

  if (!response.ok) {
    throw new Error(getErrorMessage(payload))
  }

  return (payload as CalculateResponse).result
}

function getErrorMessage(payload: CalculateResponse | ErrorResponse) {
  if ('error' in payload && payload.error) {
    return payload.error
  }

  if ('message' in payload && payload.message) {
    return payload.message
  }

  return 'Failed to calculate'
}
