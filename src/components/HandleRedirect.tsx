import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../lib/utils";

const HandleRedirect = () => {
  const { alias } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await apiClient.get(`/api/shorten/${alias}`);
        if (response.data.url) {
          setTimeout(() => {
            window.location.href = response.data.url;
          }, 3000);
        }
      } catch (error) {
        console.error(error);
        navigate("/not-found");
      }
    };

    fetchUrl();
  }, [alias, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="space-y-8 text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Redirecting you</h1>
          <p className="text-muted-foreground">
            Please wait while we take you to your destination
          </p>
        </div>
      </div>
    </div>
  );
};

export default HandleRedirect;
