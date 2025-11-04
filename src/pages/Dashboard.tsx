import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, CreditCard, User, TrendingUp, DollarSign } from "lucide-react";
import logo from "@/assets/logo.png";

const Dashboard = () => {
  const balance = 125000.50;
  const userName = "Juan Pérez";

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
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <User className="h-5 w-5 mr-2" />
                {userName}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-secondary to-secondary/90 text-white p-8 shadow-xl border-0 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Saldo disponible</p>
              <h2 className="text-4xl md:text-5xl font-bold">
                ${balance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <div className="flex gap-3">
              <Link to="/transfer">
                <Button className="bg-white text-secondary hover:bg-white/90 shadow-lg">
                  <ArrowUpRight className="h-5 w-5 mr-2" />
                  Transferir
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link to="/transfer" className="block">
            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border border-border/50 hover:border-secondary/50">
              <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <ArrowUpRight className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-card-foreground">Transferir dinero</h3>
            </Card>
          </Link>

          <Link to="/credits" className="block">
            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border border-border/50 hover:border-accent/50">
              <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <CreditCard className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground">Pedir crédito</h3>
            </Card>
          </Link>

          <Link to="/credits" className="block">
            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border border-border/50 hover:border-primary/50">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground">Mis créditos</h3>
            </Card>
          </Link>

          <Link to="/credit-profile" className="block">
            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border border-border/50 hover:border-secondary/50">
              <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-card-foreground">Perfil crediticio</h3>
            </Card>
          </Link>
        </div>

        {/* Active Credits Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Créditos activos</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 border border-border/50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Crédito Rápido</p>
                  <h3 className="text-2xl font-bold text-card-foreground">$50,000</h3>
                </div>
                <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full">
                  En curso
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cuota mensual:</span>
                  <span className="font-semibold text-card-foreground">$17,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Próximo vencimiento:</span>
                  <span className="font-semibold text-card-foreground">15/12/2024</span>
                </div>
              </div>
              <Link to="/credit-detail/1">
                <Button variant="outline" className="w-full mt-4">
                  Ver detalle
                </Button>
              </Link>
            </Card>

            <Card className="p-6 border border-border/50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Crédito Normal</p>
                  <h3 className="text-2xl font-bold text-card-foreground">$120,000</h3>
                </div>
                <span className="bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                  En curso
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cuota mensual:</span>
                  <span className="font-semibold text-card-foreground">$22,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Próximo vencimiento:</span>
                  <span className="font-semibold text-card-foreground">20/12/2024</span>
                </div>
              </div>
              <Link to="/credit-detail/2">
                <Button variant="outline" className="w-full mt-4">
                  Ver detalle
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Actividad reciente</h2>
          <Card className="divide-y divide-border border border-border/50">
            {[
              { type: "sent", name: "María González", amount: -15000, date: "Hoy, 10:30" },
              { type: "received", name: "Empresa XYZ", amount: 85000, date: "Ayer, 15:45" },
              { type: "sent", name: "Carlos Rodríguez", amount: -5500, date: "10 Nov, 18:20" },
            ].map((activity, index) => (
              <div key={index} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "sent" ? "bg-accent/10" : "bg-secondary/10"
                  }`}>
                    {activity.type === "sent" ? (
                      <ArrowUpRight className="h-5 w-5 text-accent" />
                    ) : (
                      <ArrowDownLeft className="h-5 w-5 text-secondary" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                <p className={`font-bold text-lg ${
                  activity.amount < 0 ? "text-accent" : "text-secondary"
                }`}>
                  {activity.amount < 0 ? "-" : "+"}${Math.abs(activity.amount).toLocaleString('es-AR')}
                </p>
              </div>
            ))}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
