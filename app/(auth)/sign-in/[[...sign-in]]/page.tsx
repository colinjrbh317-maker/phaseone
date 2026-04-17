import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: "w-full",
          card: "shadow-none border border-border bg-card",
        },
      }}
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/shop"
    />
  );
}
