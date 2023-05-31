import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <p>Loading login details...</p>;
  }

  if (isAuthenticated) {
    return (
      <button
        className="login-btn"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </button>
    );
  }

  return (
    <button className="login-btn" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

export default LoginButton;
