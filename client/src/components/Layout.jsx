import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { Container } from "@mantine/core";
import "./Layout.css";

function Layout() {
  return (
    <>
      <Navbar />
      <Container className="layout-container">
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
