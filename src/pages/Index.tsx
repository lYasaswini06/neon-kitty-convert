import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowDown, Sun, Moon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import CatCharacter from "@/components/CatCharacter";
import FloatingElements from "@/components/FloatingElements";
import CelebrationEffect from "@/components/CelebrationEffect";

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
];

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [titleJump, setTitleJump] = useState(false);
  const { toast } = useToast();

  // Animate title jump every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleJump(true);
      setTimeout(() => setTitleJump(false), 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle typing detection
  useEffect(() => {
    if (amount) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [amount]);

  const convertCurrency = async () => {
    if (!amount || !fromCurrency || !toCurrency) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      
      if (data.rates && data.rates[toCurrency]) {
        const convertedAmount = (parseFloat(amount) * data.rates[toCurrency]).toFixed(2);
        const fromSymbol = CURRENCIES.find(c => c.code === fromCurrency)?.symbol || '';
        const toSymbol = CURRENCIES.find(c => c.code === toCurrency)?.symbol || '';
        
        setResult(`${fromSymbol}${amount} ${fromCurrency} = ${toSymbol}${convertedAmount} ${toCurrency}`);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
        
        toast({
          title: "Conversion Successful! 🎉",
          description: "Your currency has been converted",
        });
      }
    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${darkMode ? 'dark' : ''}`}>
      <div className={`min-h-screen relative overflow-hidden ${
        darkMode 
          ? 'bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900' 
          : 'bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500'
      }`}>
        
        {/* Floating background elements */}
        <FloatingElements />
        
        {/* Celebration effect */}
        {showCelebration && <CelebrationEffect />}
        
        {/* Theme toggle */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full p-3 shadow-lg">
            <Sun className="w-4 h-4 text-yellow-300" />
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="data-[state=checked]:bg-purple-600"
            />
            <Moon className="w-4 h-4 text-blue-300" />
          </div>
        </div>

        {/* Help button */}
        <div className="absolute top-4 left-4 z-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-0 shadow-lg">
                How to Use 💡
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/90 backdrop-blur-md border-0">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  How to Use Currency Converter
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100">
                  <span className="text-2xl">1️⃣</span>
                  <span>Select your currencies from the dropdowns</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-100 to-blue-100">
                  <span className="text-2xl">2️⃣</span>
                  <span>Enter the amount you want to convert</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-100 to-pink-100">
                  <span className="text-2xl">3️⃣</span>
                  <span>Click Convert and watch the magic happen!</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            
            {/* Animated title */}
            <h1 className={`text-4xl md:text-5xl font-bold text-center mb-8 text-white drop-shadow-lg transition-transform duration-300 ${
              titleJump ? 'transform -translate-y-2 scale-105' : ''
            }`}>
              💱 Currency Converter ✨
            </h1>

            {/* Main converter card */}
            <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-white/20">
              <CardHeader>
                <CardTitle className="text-center text-white text-xl">
                  Convert Your Money 💸
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Amount input */}
                <div className="space-y-2">
                  <label className="text-white font-medium">Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 transition-all duration-300 text-lg font-semibold"
                  />
                </div>

                {/* From currency */}
                <div className="space-y-2">
                  <label className="text-white font-medium">From</label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white focus:bg-white/30 transition-all duration-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-md border-0">
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.name} ({currency.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Swap button */}
                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      setFromCurrency(toCurrency);
                      setToCurrency(fromCurrency);
                    }}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <ArrowDown className="w-5 h-5" />
                  </Button>
                </div>

                {/* To currency */}
                <div className="space-y-2">
                  <label className="text-white font-medium">To</label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white focus:bg-white/30 transition-all duration-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-md border-0">
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.name} ({currency.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Convert button */}
                <Button
                  onClick={convertCurrency}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white border-0 text-lg font-bold py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  {isLoading ? '🔄 Converting...' : '🚀 Convert Now!'}
                </Button>

                {/* Result */}
                {result && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg text-center">
                    <p className="text-white font-bold text-lg">{result}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cat character */}
        <CatCharacter isTyping={isTyping} showSuccess={!!result} />
      </div>
    </div>
  );
};

export default Index;
