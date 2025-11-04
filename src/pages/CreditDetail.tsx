import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, DollarSign, CheckCircle2 } from "lucide-react";
import logo from "@/assets/logo.png";

const CreditDetail = () => {
  const { id } = useParams();
  
  // Mock data - in a real app, this would come from an API
  const credit = id === "1" ? {
    type: "Crédito Rápido",
    amount: 50000,
    term: 90,
    tea: 115,
    cft: 130,
    totalAmount: 64520.55,
    installments: 3,
    installmentAmount: 21506.85,
    status: "En curso",
    startDate: "01/11/2024",
    payments: [
      { date: "15/11/2024", amount: 21506.85, status: "Pagado" },
      { date: "15/12/2024", amount: 21506.85, status: "Pendiente" },
      { date: "15/01/2025", amount: 21506.85, status: "Pendiente" },
    ]
  } : {
    type: "Crédito Normal",
    amount: 120000,
    term: 6,
    tea: 50,
    cft: 58,
    totalAmount: 180000,
    installments: 6,
    installmentAmount: 30000,
    status: "En curso",
    startDate: "15/10/2024",
    payments: [
      { date: "20/10/2024", amount: 30000, status: "Pagado" },
      { date: "20/11/2024", amount: 30000, status: "Pagado" },
      { date: "20/12/2024", amount: 30000, status: "Pendiente" },
      { date: "20/01/2025", amount: 30000, status: "Pendiente" },
      { date: "20/02/2025", amount: 30000, status: "Pendiente" },
      { date: "20/03/2025", amount: 30000, status: "Pendiente" },
    ]
  };

  const paidInstallments = credit.payments.filter(p => p.status === "Pagado").length;
  const progressPercentage = (paidInstallments / credit.installments) * 100;

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
        <h1 className="text-3xl font-bold text-foreground mb-2">Detalle del crédito</h1>
        <p className="text-muted-foreground mb-8">{credit.type}</p>

        {/* Credit Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border border-border/50">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Información del crédito</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo:</span>
                <span className="font-semibold text-foreground">{credit.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monto original:</span>
                <span className="font-semibold text-foreground">
                  ${credit.amount.toLocaleString('es-AR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plazo:</span>
                <span className="font-semibold text-foreground">
                  {credit.term > 12 ? `${credit.term} días` : `${credit.term} meses`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">TEA:</span>
                <span className="font-semibold text-foreground">{credit.tea}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CFT:</span>
                <span className="font-semibold text-foreground">{credit.cft}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha de inicio:</span>
                <span className="font-semibold text-foreground">{credit.startDate}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-secondary/5 border-secondary/20">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Estado del pago</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Progreso</span>
                  <span className="text-sm font-semibold text-foreground">
                    {paidInstallments} de {credit.installments} cuotas
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
              <div className="pt-3 border-t border-border space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cuota mensual:</span>
                  <span className="text-xl font-bold text-secondary">
                    ${credit.installmentAmount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total a pagar:</span>
                  <span className="text-lg font-bold text-foreground">
                    ${credit.totalAmount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estado:</span>
                  <span className="font-semibold text-secondary">{credit.status}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Schedule */}
        <Card className="p-6 border border-border/50">
          <h3 className="text-xl font-bold text-foreground mb-6">Calendario de pagos</h3>
          <div className="space-y-3">
            {credit.payments.map((payment, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                  payment.status === "Pagado" 
                    ? "bg-secondary/10 border border-secondary/20" 
                    : "bg-muted/30 border border-border/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    payment.status === "Pagado" ? "bg-secondary/20" : "bg-muted"
                  }`}>
                    {payment.status === "Pagado" ? (
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                    ) : (
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">Cuota {index + 1}</p>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">
                    ${payment.amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className={`text-sm font-semibold ${
                    payment.status === "Pagado" ? "text-secondary" : "text-accent"
                  }`}>
                    {payment.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 h-12 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary">
            <DollarSign className="h-5 w-5 mr-2" />
            Pagar cuota
          </Button>
          <Button variant="outline" className="flex-1 h-12">
            Descargar resumen
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CreditDetail;
