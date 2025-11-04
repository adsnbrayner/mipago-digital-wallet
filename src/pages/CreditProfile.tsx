import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingUp, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

const CreditProfile = () => {
  const creditScore = 750;
  const maxScore = 1000;
  const scorePercentage = (creditScore / maxScore) * 100;

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
        <h1 className="text-3xl font-bold text-foreground mb-2">Perfil crediticio</h1>
        <p className="text-muted-foreground mb-8">Tu historial y reputación financiera</p>

        {/* Credit Score Card */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-muted-foreground mb-2">Tu puntaje crediticio</p>
              <div className="flex items-baseline gap-2 mb-4">
                <h2 className="text-5xl font-bold text-foreground">{creditScore}</h2>
                <span className="text-xl text-muted-foreground">/ {maxScore}</span>
              </div>
              <Progress value={scorePercentage} className="h-3 mb-2" />
              <p className="text-sm text-secondary font-semibold">Excelente perfil crediticio</p>
            </div>
            <div className="bg-secondary/10 rounded-2xl p-6 text-center">
              <TrendingUp className="h-12 w-12 text-secondary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Calificación</p>
              <p className="text-2xl font-bold text-secondary">A+</p>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-secondary/10 w-10 h-10 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="font-semibold text-card-foreground">Pagos puntuales</h3>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">18</p>
            <p className="text-sm text-muted-foreground">de 20 créditos</p>
          </Card>

          <Card className="p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-accent/10 w-10 h-10 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground">Pagos en mora</h3>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">2</p>
            <p className="text-sm text-muted-foreground">últimos 12 meses</p>
          </Card>

          <Card className="p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground">Antigüedad</h3>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">3</p>
            <p className="text-sm text-muted-foreground">años en MiPago</p>
          </Card>
        </div>

        {/* Credit History */}
        <Card className="p-6 mb-8 border border-border/50">
          <h3 className="text-xl font-bold text-foreground mb-6">Historial de créditos</h3>
          <div className="space-y-4">
            {[
              { date: "Nov 2024", type: "Crédito Rápido", amount: 50000, status: "En curso", statusColor: "text-secondary" },
              { date: "Oct 2024", type: "Crédito Normal", amount: 120000, status: "En curso", statusColor: "text-secondary" },
              { date: "Sep 2024", type: "Crédito Rápido", amount: 30000, status: "Pagado", statusColor: "text-primary" },
              { date: "Ago 2024", type: "Crédito Normal", amount: 80000, status: "Pagado", statusColor: "text-primary" },
              { date: "Jul 2024", type: "Crédito Rápido", amount: 25000, status: "Mora", statusColor: "text-accent" },
            ].map((credit, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-card-foreground">{credit.type}</p>
                  <p className="text-sm text-muted-foreground">{credit.date}</p>
                </div>
                <div className="text-right mr-6">
                  <p className="font-bold text-foreground">${credit.amount.toLocaleString('es-AR')}</p>
                </div>
                <div>
                  <span className={`text-sm font-semibold ${credit.statusColor}`}>
                    {credit.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-6 bg-secondary/5 border-secondary/20">
          <h3 className="text-xl font-bold text-foreground mb-4">Recomendaciones</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">
                Pagá tus cuotas a tiempo para mantener tu excelente perfil crediticio.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">
                Con tu puntaje actual, calificás para las mejores tasas de interés.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">
                Evitá nuevas moras para seguir mejorando tu calificación.
              </p>
            </li>
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default CreditProfile;
