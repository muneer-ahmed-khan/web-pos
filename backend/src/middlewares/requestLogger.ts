import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the incoming request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // Store the original res.json function
  const originalJson = res.json;

  // Override the res.json function to log the response before sending it
  res.json = function (this: Response, body: any) {
    console.log(
      `[${new Date().toISOString()}] Response: ${JSON.stringify(body, null, 3)}`
    );

    // Call the original res.json function
    return originalJson.call(this, body);
  };

  // Pass control to the next middleware function
  next();
};
