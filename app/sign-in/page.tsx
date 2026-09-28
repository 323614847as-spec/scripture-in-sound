import type { Metadata } from "next";
import { AuthForm } from "../../components/AuthForm";

export const metadata: Metadata = { title: "Sign In", robots: { index: false, follow: true } };
export default async function SignInPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  return <main id="main-content" className="auth-page page-shell"><AuthForm mode="sign-in" error={params.error} message={params.message} next={params.next} googleEnabled={process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === "true"} /></main>;
}
