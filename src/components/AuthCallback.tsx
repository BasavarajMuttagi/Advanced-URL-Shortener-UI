import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AuthCallback() {
  const navigate = useNavigate();
  const loc = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(loc.search);
        const token = params.get("token");

        if (!token) {
          setError("Authentication failed. No token received.");
          setTimeout(() => navigate("/"), 2000);
          return;
        }

        sessionStorage.setItem("token", token);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        navigate("/dashboard");
        location.reload();
      } catch (err) {
        console.log(err);
        setError("Authentication failed. Please try again.");
        setTimeout(() => navigate("/"), 2000);
      }
    };

    handleCallback();
  }, [navigate, loc]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-destructive">{error}</h1>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="space-y-8 text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Authenticating...</h1>
          <p className="text-muted-foreground">
            Please wait while we complete your sign in
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthCallback;
