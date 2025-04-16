"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { currencies } from "@/lib/currencies"
import { convertCurrency } from "@/lib/convert-currency"

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1")
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [result, setResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  const handleFromCurrencyChange = (value: string) => {
    setFromCurrency(value)
  }

  const handleToCurrencyChange = (value: string) => {
    setToCurrency(value)
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleConvert = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const convertedAmount = await convertCurrency(Number(amount), fromCurrency, toCurrency)
      setResult(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`)
    } catch (err) {
      setError("Failed to convert currency. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl text-center text-gray-800">Convert Currency</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-gray-700">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className="border-gray-300 focus:border-gray-500"
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] items-end gap-2">
          <div className="space-y-2">
            <Label htmlFor="from-currency" className="text-gray-700">
              From
            </Label>
            <Select value={fromCurrency} onValueChange={handleFromCurrencyChange}>
              <SelectTrigger id="from-currency" className="border-gray-300 focus:border-gray-500">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwapCurrencies}
            className="mb-0.5"
            aria-label="Swap currencies"
          >
            <ArrowRightLeft className="h-4 w-4 text-gray-500" />
          </Button>

          <div className="space-y-2">
            <Label htmlFor="to-currency" className="text-gray-700">
              To
            </Label>
            <Select value={toCurrency} onValueChange={handleToCurrencyChange}>
              <SelectTrigger id="to-currency" className="border-gray-300 focus:border-gray-500">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {result && !error && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-center font-medium text-gray-800">{result}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleConvert}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Converting..." : "Convert"}
        </Button>
      </CardFooter>
    </Card>
  )
}
