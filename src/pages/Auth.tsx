import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode") || "login";
  const [isLogin, setIsLogin] = useState(mode === "login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    dni: "",
    acceptTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
      if (!formData.acceptTerms) {
        toast.error("Debes aceptar los Términos y Condiciones");
        return;
      }
    }

    // Simulated auth - in real app, this would call an API
    toast.success(isLogin ? "¡Bienvenido a MiPago!" : "¡Cuenta creada exitosamente!");
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="MiPago" className="h-20 w-20 rounded-2xl mb-4" />
            <h1 className="text-3xl font-bold text-primary">MiPago</h1>
            <p className="text-muted-foreground mt-2">
              {isLogin ? "Ingresá a tu cuenta" : "Creá tu cuenta"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre completo</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Juan Pérez"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dni">DNI</Label>
                  <Input
                    id="dni"
                    type="text"
                    placeholder="12345678"
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="h-12"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="h-12"
                />
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-secondary hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start gap-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, acceptTerms: checked as boolean })
                  }
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                  Acepto los{" "}
                  <a href="#" className="text-secondary hover:underline">
                    Términos y Condiciones
                  </a>
                </label>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white font-semibold text-lg shadow-lg"
            >
              {isLogin ? "Ingresar" : "Crear cuenta"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "¿No tenés cuenta?" : "¿Ya tenés cuenta?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-secondary font-semibold hover:underline"
              >
                {isLogin ? "Crear cuenta" : "Iniciar sesión"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
