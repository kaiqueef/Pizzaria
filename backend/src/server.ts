import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";

const app = express();
app.use(express.json());

app.use(router);

//MiddleWare
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    //Se for uma instancia do tipo erro
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(3333, () => console.log("Servidor online"));
