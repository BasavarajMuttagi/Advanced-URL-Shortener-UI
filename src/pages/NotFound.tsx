import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="max-w-2xl space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-7xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            The page you are looking for doesn't exist or has been moved. Please
            check the URL or try one of the options below.
          </p>
        </div>

        <div className="inline-flex gap-4">
          <Button variant="default" onClick={() => navigate("/")}>
            Return Home
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          Error Code: 404 | Page Not Found
        </div>
      </div>
    </div>
  );
}

export default NotFound;
