import { Outlet } from "remix";
import MainLayout from "~/layouts/mainLayout";
import globalStyles from "~/styles/global.css";
import Reload from "~/liveReload";
import { Meta } from "remix";

export const meta = () => {

  const description = "A Todo Web Application";
  const keywords = "Todo, Typescript, React, Bulma"

  return {
    description,
    keywords
  }
}

export default function App() {

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <link rel="stylesheet" type="text/css" href={globalStyles} />
        <title>Todo App</title>
      </head>
    <body>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <Reload />
    </body>
    </html>
  );

}

export function ErrorBoundary({ error }: any) {

  console.error(error);

  return (

    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <link rel="stylesheet" type="text/css" href={globalStyles} />
        <title>Todo App</title>
      </head>
    <body>
      <MainLayout>
        <h1 className="title">Error!</h1>
        <pre>{error.message}</pre>
      </MainLayout>
    </body>
    </html>

  )

}