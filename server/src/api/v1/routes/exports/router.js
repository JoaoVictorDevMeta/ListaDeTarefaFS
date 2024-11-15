//import routes
import userRoutes from "../user.routes.js";
import taskRoutes from "../task.routes.js";
import categoryRoutes from "../category.routes.js";
import profileRoutes from "../profile.routes.js";
import authRoutes from "../auth.routes.js";
import adminRoutes from "../admin.routes.js";

//---- THIS IS PERSONAL PREFERENCE ----
//I prefer to export the routes implementation
//conglomerate them in this file and export it all
//on the app.js just keeps the app configuration
//routes implementation
export default function serverRoutes(app) {
  //every route implementation
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/task", taskRoutes);
  app.use("/api/v1/category", categoryRoutes);
  app.use("/api/v1/profile", profileRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/admin", adminRoutes);

  app.all("*", (req, res) => {
    res.status(404).send({ error: "this route does not exist" });
  });
}