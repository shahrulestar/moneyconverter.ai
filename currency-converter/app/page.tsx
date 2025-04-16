import CurrencyConverter from "@/components/currency-converter"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-black mb-8">Currency Converter</h1>
        <div className="max-w-md mx-auto">
          <CurrencyConverter />
        </div>
      </div>
    </main>
  )
}
