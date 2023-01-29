import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AddClassModal } from "./AddClassModal";
import { useRequests } from "../context/RequestContext";
import { RemoveClassModal } from "./RemoveClassModal";
import { useLocation } from "react-router-dom";

export function NavBar() {
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showRemoveClassModal, setShowRemoveClassModal] = useState(false);
  const [locationClassesState, setLocationClassesState] = useState(false);

  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/queries") {
      setLocationClassesState(true);
    } else {
      setLocationClassesState(false);
    }
  }, [location]);

  const { clearRequests } = useRequests();

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand>BlueNote</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/summarize">Summarize</Nav.Link>
            <Nav.Link href="/notes">Notes</Nav.Link>
            <Nav.Link href="/queries">Classes</Nav.Link>
            <Nav.Link href="/account">Account</Nav.Link>
            {locationClassesState && (
              <NavDropdown
                id="nav-dropdown-dark"
                title="Menu"
                menuVariant="dark"
              >
                <NavDropdown.Item onClick={() => setShowAddClassModal(true)}>
                  Add Class
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setShowRemoveClassModal(true)}>
                  Remove Class
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    clearRequests();
                  }}
                >
                  Clear Queries
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>

      <AddClassModal
        show={showAddClassModal}
        handleClose={() => setShowAddClassModal(false)}
      ></AddClassModal>
      <RemoveClassModal
        show={showRemoveClassModal}
        handleClose={() => setShowRemoveClassModal(false)}
      ></RemoveClassModal>
    </>
  );
}
