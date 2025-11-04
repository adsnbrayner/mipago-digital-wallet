import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowLeft, Zap, TrendingUp } from "lucide-react";
import logo from "@/assets/logo.png";

const Credits = () => {
  const navigate = useNavigate();
  const [quickAmount, setQuickAmount] = useState("");
  const [quickTerm, setQuickTerm] = useState<30 | 60 | 90>(30);
  const [normalAmount, setNormalAmount] = useState("");
  const [normalTerm, setNormalTerm] = useState<3 | 6 | 9 | 12>(6);

  const calculateQuickCredit = () => {
    const amount = parseFloat(quickAmount || "0");
    const rates = {
      30: { tea: 15, cft: 18 },
      60: { tea: 16, cft: 19 },
      90: { tea: 17, cft: 20 },
    };
    
    const rate = rates[quickTerm];
    const totalAmount = amount * (1 + rate.tea / 100 * (quickTerm / 365));
    
    return {
      tea: rate.tea,
      cft: rate.cft,
      totalAmount: totalAmount.toFixed(2),
      installments: quickTerm / 30,
      installment: (totalAmount / (quickTerm / 30)).toFixed(2),
    };
  };

  const calculateNormalCredit = () => {
    const amount = parseFloat(normalAmount || "0");
    const rates = {
      3: { tea: 8, cft: 10 },
      6: { tea: 10, cft: 13 },
      9: { tea: 13, cft: 16 },
      12: { tea: 16, cft: 19 },
    };
    
    const rate = rates[normalTerm];
    const totalAmount = amount * (1 + rate.tea / 100);
    
    return {
      tea: rate.tea,
      cft: rate.cft,
      totalAmount: totalAmount.toFixed(2),
      installments: normalTerm,
      installment: (totalAmount / normalTerm).toFixed(2),
    };
  };

  const handleQuickCredit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("¡Crédito rápido solicitado exitosamente!");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  const handleNormalCredit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("¡Crédito normal solicitado exitosamente!");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  const quickCredit = calculateQuickCredit();
  const normalCredit = calculateNormalCredit();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/95 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="MiPago" className="h-10 w-10 rounded-xl" />
              <span className="text-2xl font-bold">MiPago</span>
            </div>
            <Link to="/dashboard">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">Solicitar crédito</h1>
        <p className="text-muted-foreground mb-8">Elegí el crédito que mejor se adapte a tus necesidades</p>

        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-14 mb-8">
            <TabsTrigger value="quick" className="text-base">
              <Zap className="h-5 w-5 mr-2" />
              Crédito Rápido
            </TabsTrigger>
            <TabsTrigger value="normal" className="text-base">
              <TrendingUp className="h-5 w-5 mr-2" />
              Crédito Normal
            </TabsTrigger>
          </TabsList>

          {/* Quick Credit Tab */}
          <TabsContent value="quick" className="space-y-6">
            <Card className="p-6 bg-accent/5 border-accent/20">
              <h3 className="font-semibold text-lg text-foreground mb-2">Crédito Rápido</h3>
              <p className="text-sm text-muted-foreground">
                Dinero al instante para tus necesidades urgentes. Plazos cortos de hasta 90 días.
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border border-border/50">
                <form onSubmit={handleQuickCredit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="quickAmount">Monto a solicitar</Label>
                    <Input
                      id="quickAmount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={quickAmount}
                      onChange={(e) => setQuickAmount(e.target.value)}
                      required
                      className="h-12 text-lg font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Plazo</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {[30, 60, 90].map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setQuickTerm(term as 30 | 60 | 90)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            quickTerm === term
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <div className="text-xl font-bold text-foreground">{term}</div>
                          <div className="text-xs text-muted-foreground">días</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent"
                  >
                    Solicitar crédito
                  </Button>
                </form>
              </Card>

              <Card className="p-6 bg-muted/50 border border-border/50">
                <h3 className="font-semibold text-lg text-foreground mb-4">Resumen del crédito</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monto solicitado:</span>
                    <span className="font-semibold text-foreground">
                      ${parseFloat(quickAmount || "0").toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plazo:</span>
                    <span className="font-semibold text-foreground">{quickTerm} días</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">TEA:</span>
                    <span className="font-semibold text-foreground">{quickCredit.tea}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CFT:</span>
                    <span className="font-semibold text-foreground">{quickCredit.cft}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cuotas:</span>
                    <span className="font-semibold text-foreground">{quickCredit.installments}</span>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Cuota mensual:</span>
                      <span className="text-lg font-bold text-accent">
                        ${parseFloat(quickCredit.installment).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total a pagar:</span>
                      <span className="text-lg font-bold text-foreground">
                        ${parseFloat(quickCredit.totalAmount).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Normal Credit Tab */}
          <TabsContent value="normal" className="space-y-6">
            <Card className="p-6 bg-secondary/5 border-secondary/20">
              <h3 className="font-semibold text-lg text-foreground mb-2">Crédito Normal</h3>
              <p className="text-sm text-muted-foreground">
                Mejores tasas para plazos más largos. Hasta 12 meses para pagar tu crédito.
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border border-border/50">
                <form onSubmit={handleNormalCredit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="normalAmount">Monto a solicitar</Label>
                    <Input
                      id="normalAmount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={normalAmount}
                      onChange={(e) => setNormalAmount(e.target.value)}
                      required
                      className="h-12 text-lg font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Plazo (meses)</Label>
                    <div className="grid grid-cols-4 gap-3">
                      {[3, 6, 9, 12].map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setNormalTerm(term as 3 | 6 | 9 | 12)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            normalTerm === term
                              ? "border-secondary bg-secondary/10"
                              : "border-border hover:border-secondary/50"
                          }`}
                        >
                          <div className="text-xl font-bold text-foreground">{term}</div>
                          <div className="text-xs text-muted-foreground">meses</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary"
                  >
                    Solicitar crédito
                  </Button>
                </form>
              </Card>

              <Card className="p-6 bg-muted/50 border border-border/50">
                <h3 className="font-semibold text-lg text-foreground mb-4">Resumen del crédito</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monto solicitado:</span>
                    <span className="font-semibold text-foreground">
                      ${parseFloat(normalAmount || "0").toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plazo:</span>
                    <span className="font-semibold text-foreground">{normalTerm} meses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">TEA:</span>
                    <span className="font-semibold text-foreground">{normalCredit.tea}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CFT:</span>
                    <span className="font-semibold text-foreground">{normalCredit.cft}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cuotas:</span>
                    <span className="font-semibold text-foreground">{normalCredit.installments}</span>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Cuota mensual:</span>
                      <span className="text-lg font-bold text-secondary">
                        ${parseFloat(normalCredit.installment).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total a pagar:</span>
                      <span className="text-lg font-bold text-foreground">
                        ${parseFloat(normalCredit.totalAmount).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Comparison Table */}
        <Card className="mt-8 p-6 border border-border/50">
          <h3 className="font-semibold text-xl text-foreground mb-4">Comparación de créditos</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Característica</th>
                  <th className="text-center py-3 px-4 text-accent font-semibold">Crédito Rápido</th>
                  <th className="text-center py-3 px-4 text-secondary font-semibold">Crédito Normal</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 text-muted-foreground">Plazo</td>
                  <td className="text-center py-3 px-4 font-semibold text-foreground">30-90 días</td>
                  <td className="text-center py-3 px-4 font-semibold text-foreground">3-12 meses</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 text-muted-foreground">TEA</td>
                  <td className="text-center py-3 px-4 font-semibold text-foreground">15-17%</td>
                  <td className="text-center py-3 px-4 font-semibold text-foreground">8-16%</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 text-muted-foreground">Aprobación</td>
                  <td className="text-center py-3 px-4 font-semibold text-foreground">Instantánea</td>
                  <td className="text-center py-3 px-4 font-semibold text-foreground">24-48 hs</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-muted-foreground">Mejor para</td>
                  <td className="text-center py-3 px-4 text-sm text-muted-foreground">Emergencias</td>
                  <td className="text-center py-3 px-4 text-sm text-muted-foreground">Planificación</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Credits;
