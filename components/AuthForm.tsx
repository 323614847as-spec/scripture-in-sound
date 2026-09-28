import Link from "next/link";
import { signIn, signInWithGoogle, signUp } from "../app/auth/actions";

type Props = {
  mode: "sign-in" | "sign-up";
  error?: string;
  message?: string;
  next?: string;
  googleEnabled?: boolean;
};

export function AuthForm({ mode, error, message, next, googleEnabled }: Props) {
  const signingUp = mode === "sign-up";
  return (
    <div className="auth-panel">
      <div>
        <p className="eyebrow">Community account</p>
        <h1>{signingUp ? "Join the conversation." : "Welcome back."}</h1>
        <p>{signingUp ? "Create a minimal account to take part in discussions and save archive material." : "Sign in to discuss, reply, save material, and manage your contributions."}</p>
      </div>
      <form action={signingUp ? signUp : signIn} className="editorial-form">
        {!signingUp && next ? <input type="hidden" name="next" value={next} /> : null}
        {signingUp ? <>
          <label>Display name<input name="displayName" required maxLength={60} autoComplete="name" /></label>
          <label>Username<input name="username" required minLength={3} maxLength={30} pattern="[A-Za-z0-9_]+" autoComplete="username" /><small>Letters, numbers, and underscores. Real names are not required.</small></label>
        </> : null}
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
        <label>Password<input name="password" type="password" required minLength={8} autoComplete={signingUp ? "new-password" : "current-password"} /></label>
        {error ? <p className="form-message form-message--error" role="alert">{error}</p> : null}
        {message ? <p className="form-message" role="status">{message}</p> : null}
        <button className="button button--solid" type="submit">{signingUp ? "Create account" : "Sign in"}</button>
        <p className="small-note">By participating, you agree to the <Link href="/community/guidelines">Community Guidelines</Link> and <Link href="/privacy">Privacy Notice</Link>.</p>
      </form>
      {googleEnabled ? <form action={signInWithGoogle}><button className="button button--outline auth-google" type="submit">Continue with Google</button></form> : null}
      <p>{signingUp ? <>Already have an account? <Link className="text-link" href="/sign-in">Sign in →</Link></> : <>New here? <Link className="text-link" href="/sign-up">Create an account →</Link></>}</p>
    </div>
  );
}
