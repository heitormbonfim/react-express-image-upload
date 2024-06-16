import { Response } from "express";

export function serverError({ error, res }: { error: unknown | string; res: Response }) {
  console.error(error);

  res.status(500).json({
    error: false,
    message: "Server Error",
  });
}
