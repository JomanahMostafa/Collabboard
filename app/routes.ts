import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("login", "routes/login.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("boards", "routes/boards.tsx"),
  route("boards/:boardId", "routes/boards.$boardId.tsx"),
  route("settings", "routes/settings.tsx"),
  route("admin", "routes/admin.tsx"),
  route("team", "routes/team.tsx"),
] satisfies RouteConfig;
