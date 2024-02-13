import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

interface CustomError extends Error {
  status?: string;
  statusText?: string;
}

function ErrorPage() {
  const error = useRouteError() as CustomError;
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Something went wrong.</p>
        <p>
          {error.status} {error.statusText}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <p>{error.message || 'Unknown Error'}</p>
    </div>
  );
}

export default ErrorPage;
