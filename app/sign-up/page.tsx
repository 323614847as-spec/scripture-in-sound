import type { Metadata } from "next";
import { AuthForm } from "../../components/AuthForm";

export const metadata: Metadata = { title: "Create Account", robots: { index: false, follow: true } };
export default async function SignUpPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  return <main id="main-content" className="auth-page page-shell"><AuthForm mode="sign-up" error={params.error} message={params.message} /></main>;
}
