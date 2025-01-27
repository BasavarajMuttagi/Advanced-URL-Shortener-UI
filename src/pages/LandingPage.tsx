import { Button } from "../components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
const BASE_URL = import.meta.env.VITE_BASE_URL;
function LandingPage() {
  const login = async () => {
    const data = await fetch(`${BASE_URL}/auth/google`).then((res) =>
      res.json(),
    );
    window.location.href = data.url;
  };
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <nav className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold">URLShort</div>
          <Button variant="outline" onClick={login}>
            Sign in with Google
          </Button>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl flex-1 px-6 pt-20 text-center">
        <h1 className="scroll-m-20 text-6xl font-bold leading-tight">
          The simplest way to
          <br /> shorten URLs
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
          Create, manage, and analyze your shortened URLs with powerful features
          designed for modern web sharing
        </p>
        <div className="mt-12">
          <Button size="lg" className="px-8">
            Get Started — It's Free
          </Button>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>
                Track clicks, unique visitors, device types, and user engagement
                with comprehensive daily and weekly reports
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smart Organization</CardTitle>
              <CardDescription>
                Group URLs by topics like acquisition, activation, and retention
                for better campaign management and tracking
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom URLs</CardTitle>
              <CardDescription>
                Create personalized short links with custom aliases and track
                their performance in real-time
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
