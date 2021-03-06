import React, { useState } from "react";
import { Card, Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import API from "../../utils/API";
import { useAuth } from "../contexts/AuthContext";
import "./style.css";

const styles = {
  title: {
    color: "#ffffff",
    fontSize: "25px",
    fontWeight: "bolder",
  },
  SASDetail: {
    backgroundColor: "#8dc6bf",
  },
  button: {
    backgroundColor: "#99658A",
    borderColor: "#99658A",
    fontWeight: "bold",
    fontSize: "18px",
    width: "200px",
    height: "45px",
  },
  modalButton: {
    backgroundColor: "#99658A",
    borderColor: "#99658A",
    fontWeight: "bold",
    fontSize: "18px",
    marginTop: "20px",
  },
  modalHead: {
    backgroundColor: "#ee6a59",
  },
  modalTitle: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  modal: {
    backgroundColor: "#FFFFF0",
  },
  formControl: {
    width: "300px",
    margin: "auto",
    marginTop: "20px",
  },
  tButton: {
    backgroundColor: "#99658A",
    borderColor: "#99658A",
    fontWeight: "bold",
    fontSize: "18px",
  },

  table: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
  },
  tableHead: {
    color: "#ee6a59",
  },
};

function ScheduleDetailCard(props) {
  const [show, setShow] = useState(false);
  const [formObject, setFormObject] = useState({});
  const { currentUser } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let activitySort = [];

  if (props.schedule) {
    activitySort = props.schedule.sort(function (a, b) {
      return (
        Date.parse(
          "1970/01/01 " + a.time.slice(0, -2) + " " + a.time.slice(-2)
        ) -
        Date.parse("1970/01/01 " + b.time.slice(0, -2) + " " + b.time.slice(-2))
      );
    });
  } else {
    activitySort = [];
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addActivity(formObject);
  };

  const addActivity = (activity) => {
    activity.time = getFormattedTime(activity.time);
    API.updateParty(props.partyId, {
      schedule: [
        {
          time: activity.time,
          activity: activity.activity,
        },
      ],
    });
    handleClose();
    props.getPartyData();
  };

  const getFormattedTime = (fourDigitTime) => {
    const hours24 = parseInt(fourDigitTime.substring(0, 2));
    const hours = ((hours24 + 11) % 12) + 1;
    const amPm = hours24 > 11 ? "pm" : "am";
    const minutes = fourDigitTime.substring(2);

    return hours + minutes + amPm;
  };

  const handleDeleteBtn = (event, activity) => {
    API.updateParty(props.partyId, {
      schedule: [
        {
          time: activity.time,
          activity: activity.activity,
          _id: activity._id,
        },
      ],
    });
    props.getPartyData();
  };

  return (
    <Card style={styles.SASDetail}>
      <Card.Body>
        <Card.Title style={styles.title}>Schedule</Card.Title>
        <Table responsive style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              <th>Activity</th>
              <th>Time</th>
              {currentUser.uid === props.creator ? <th>Remove</th> : ""}
            </tr>
          </thead>
          <tbody>
            {!props.schedule ? (
              <tr>
                <td>Press the add to schedule button to add activities</td>
              </tr>
            ) : (
              activitySort.map((activity) => {
                return (
                  <tr key={activity._id}>
                    <td className="font-weight-bold">{activity.activity}</td>
                    <td>{activity.time}</td>

                    {currentUser.uid === props.creator ? (
                      <td>
                        <Button
                          style={styles.tButton}
                          value={activity._id}
                          onClick={(event) => handleDeleteBtn(event, activity)}
                          className="hoverButton"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
        {currentUser.uid === props.creator ? (
          <center>
            <Button
              href="#"
              style={styles.button}
              onClick={handleShow}
              className="hoverButton"
            >
              Add to Schedule
            </Button>
          </center>
        ) : (
          ""
        )}
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          className="text-center"
        >
          <Modal.Header closeButton style={styles.modalHead}>
            <Modal.Title style={styles.modalTitle}>Add Activity</Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modal} className="font-weight-bold">
            Enter the activity name and time below
            <Form onSubmit={handleFormSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter Activity"
                  style={styles.formControl}
                  onChange={handleInputChange}
                  name="activity"
                ></Form.Control>
                <Form.Control
                  type="time"
                  placeholder="Enter Time"
                  style={styles.formControl}
                  onChange={handleInputChange}
                  name="time"
                ></Form.Control>
                <Button
                  style={styles.modalButton}
                  type="submit"
                  className="hoverButton"
                >
                  Add Activity
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  );
}

export default ScheduleDetailCard;
