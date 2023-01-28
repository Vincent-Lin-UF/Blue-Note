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
  const [locationNotesState, setLocationNotesState] = useState(false);

  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/queries") {
      setLocationClassesState(true);
    } else if (location.pathname === "/notes") {
      setLocationNotesState(true);
    } else {
      setLocationClassesState(false);
      setLocationNotesState(false);
    }
  }, [location]);

  const { clearRequests } = useRequests();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand>BlueNote</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/summarize">Summarize</Nav.Link>
            <Nav.Link href="/notes">Notes</Nav.Link>
            <Nav.Link href="/queries">Classes</Nav.Link>
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
            {locationNotesState && (
              <NavDropdown
                menuVariant="dark"
                title="Menu"
                id="nav-dropdown-dark"
                style={{ marginRight: "1vh" }}
              >
                <NavDropdown.Item onClick={handleSubmit}>
                  Analyze
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
