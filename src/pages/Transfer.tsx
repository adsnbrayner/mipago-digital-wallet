import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowLeft, User, DollarSign, MessageSquare } from "lucide-react";
import logo from "@/assets/logo.png";

const Transfer = () => {
  const navigate = useNavigate();
  const balance = 125000.50;
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<30 | 60 | 90>(30);
  
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    reason: "",
  });

  const creditAmount = Math.max(0, parseFloat(formData.amount || "0") - balance);
  
  const calculateCredit = (term: 30 | 60 | 90) => {
    const rates = {
      30: { tea: 95, cft: 108 },
      60: { tea: 105, cft: 119 },
      90: { tea: 115, cft: 130 },
    };
    
    const rate = rates[term];
    const totalAmount = creditAmount * (1 + rate.tea / 100 * (term / 365));
    
    return {
      tea: rate.tea,
      cft: rate.cft,
      totalAmount: totalAmount.toFixed(2),
      installment: (totalAmount / (term / 30)).toFixed(2),
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(formData.amount);
    
    if (amount > balance) {
      setShowCreditModal(true);
      return;
    }
    
    toast.success("Transferencia realizada exitosamente");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  const handleCreditAndTransfer = () => {
    toast.success("Crédito aprobado y transferencia realizada");
    setShowCreditModal(false);
    setTimeout(() => navigate("/dashboard"), 1500);
  };

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

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">Transferir dinero</h1>
        <p className="text-muted-foreground mb-8">Enviá dinero de forma rápida y segura</p>

        {/* Balance Display */}
        <Card className="p-6 mb-8 bg-secondary/5 border-secondary/20">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Saldo disponible</span>
            <span className="text-2xl font-bold text-secondary">
              ${balance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </Card>

        <Card className="p-8 border border-border/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Destinatario
              </Label>
              <Input
                id="recipient"
                type="text"
                placeholder="Nombre o email del destinatario"
                value={formData.recipient}
                onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Monto
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                className="h-12 text-lg font-semibold"
              />
              {parseFloat(formData.amount || "0") > balance && (
                <p className="text-sm text-accent">
                  Te faltan ${creditAmount.toLocaleString('es-AR', { minimumFractionDigits: 2 })} para completar esta transferencia
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Motivo (opcional)
              </Label>
              <Input
                id="reason"
                type="text"
                placeholder="¿Para qué es esta transferencia?"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="h-12"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white font-semibold text-lg"
            >
              Transferir
            </Button>
          </form>
        </Card>
      </main>

      {/* Quick Credit Modal */}
      <Dialog open={showCreditModal} onOpenChange={setShowCreditModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">¿Necesitás un crédito rápido?</DialogTitle>
            <DialogDescription>
              No tenés saldo suficiente. Podemos prestarte ${creditAmount.toLocaleString('es-AR', { minimumFractionDigits: 2 })} para completar tu transferencia.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-sm font-semibold text-foreground">Elegí el plazo:</p>
            <div className="grid grid-cols-3 gap-3">
              {[30, 60, 90].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setSelectedTerm(term as 30 | 60 | 90)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedTerm === term
                      ? "border-secondary bg-secondary/10"
                      : "border-border hover:border-secondary/50"
                  }`}
                >
                  <div className="text-2xl font-bold text-foreground">{term}</div>
                  <div className="text-xs text-muted-foreground">días</div>
                </button>
              ))}
            </div>

            <Card className="p-4 bg-muted/50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monto a financiar:</span>
                <span className="font-semibold text-foreground">
                  ${creditAmount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">TEA:</span>
                <span className="font-semibold text-foreground">{calculateCredit(selectedTerm).tea}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">CFT:</span>
                <span className="font-semibold text-foreground">{calculateCredit(selectedTerm).cft}%</span>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total a pagar:</span>
                  <span className="text-lg font-bold text-accent">
                    ${parseFloat(calculateCredit(selectedTerm).totalAmount).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCreditModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreditAndTransfer}
                className="flex-1 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent"
              >
                Aceptar crédito
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transfer;
