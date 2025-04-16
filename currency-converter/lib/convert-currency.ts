export async function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
  try {
    // Using ExchangeRate-API for conversion rates
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates")
    }

    const data = await response.json()

    if (!data.rates || !data.rates[toCurrency]) {
      throw new Error(`Exchange rate not available for ${toCurrency}`)
    }

    const rate = data.rates[toCurrency]
    return amount * rate
  } catch (error) {
    console.error("Error converting currency:", error)
    throw error
  }
}
