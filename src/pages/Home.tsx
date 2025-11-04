import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, CreditCard } from "lucide-react";
import logo from "@/assets/logo.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="MiPago" className="h-12 w-12 rounded-xl" />
            <span className="text-2xl font-bold text-primary">MiPago</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth?mode=login">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Iniciar sesión
              </Button>
            </Link>
            <Link to="/auth?mode=register">
              <Button className="bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary shadow-lg">
                Crear cuenta
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
              Tu billetera digital para el futuro
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Transferí dinero al instante, pagá sin complicaciones y accedé a créditos cuando lo necesites. Todo en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/auth?mode=register">
                <Button size="lg" className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent shadow-lg w-full sm:w-auto">
                  Empezar ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth?mode=login">
                <Button size="lg" variant="outline" className="border-2 w-full sm:w-auto">
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-3xl p-8 backdrop-blur-sm border border-border/50">
              <img src={logo} alt="MiPago App" className="w-full rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-card rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border border-border/50">
            <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Transferencias instantáneas</h3>
            <p className="text-muted-foreground">
              Enviá dinero a cualquier persona en segundos, sin complicaciones ni costos ocultos.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border border-border/50">
            <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Créditos al instante</h3>
            <p className="text-muted-foreground">
              Accedé a créditos rápidos o tradicionales con tasas transparentes y sin trámites.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border border-border/50">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">100% seguro</h3>
            <p className="text-muted-foreground">
              Tu dinero protegido con los más altos estándares de seguridad bancaria.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="MiPago" className="h-8 w-8 rounded-lg" />
            <span className="text-sm text-muted-foreground">© 2024 MiPago. Todos los derechos reservados.</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
