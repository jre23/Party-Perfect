import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ScheduleDetailCard from "../components/ScheduleDetailCard";
import SupplyDetailCard from "../components/SupplyDetailCard";
import LocationCard from "../components/LocationCard";
import API from "../utils/API";
import { useParams } from "react-router-dom";
import AttendeeDetailCard from "../components/AttendeeDetailCard";
import PartyImageCard from "../components/PartyImageCard";

const styles = {
  button: {
    backgroundColor: "#99658a",
  },
};

function Party() {
  const [partyData, setPartyData] = useState({});
  const [partyPosition, setPartyPosition] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getPartyData();
  }, []);

  const getPartyData = () => {
    API.getParty(id)
      .then((res) => {
        setPartyData(res.data);
        getPartyPosition();
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (inputDate) => {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
      // Months use 0 index.
      return (
        date.getMonth() +
        1 +
        "/" +
        (date.getDate() + 1) +
        "/" +
        date.getFullYear()
      );
    }
  };

  const getPartyPosition = () => {
    API.getMapBoxData(id)
      .then((res) => {
        setPartyPosition({
          lat: parseFloat(res.data.features[0].geometry.coordinates[1]),
          lon: parseFloat(res.data.features[0].geometry.coordinates[0]),
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Row className="justify-content-center my-3">
        <h1>{partyData.name}</h1>
      </Row>
      <Row className="justify-content-center mb-4">
        <h2 className="mr-3">
          Date & Time: {formatDate(partyData.date)} at {partyData.time}
        </h2>
        <h2>Party Code: {partyData._id}</h2>
      </Row>
      <Row>
        <Col className="my-2">
          <ScheduleDetailCard
            schedule={partyData.schedule}
            creator={partyData.creator}
            partyId={partyData._id}
            getPartyData={getPartyData}
          ></ScheduleDetailCard>
        </Col>
      </Row>
      <Row>
        <Col className="my-2">
          <SupplyDetailCard
            supplies={partyData.supplies}
            creator={partyData.creator}
            partyId={partyData._id}
            getPartyData={getPartyData}
          ></SupplyDetailCard>
        </Col>
        <Col className="my-2">
          <AttendeeDetailCard
            attendees={partyData.attendees}
            creator={partyData.creator}
            partyId={partyData._id}
            getPartyData={getPartyData}
          ></AttendeeDetailCard>
        </Col>
      </Row>
      <Row>
        <Col className="mt-2">
          <PartyImageCard
            image={partyData.image}
            creator={partyData.creator}
            partyId={partyData._id}
            getPartyData={getPartyData}
          ></PartyImageCard>
        </Col>
        <Col>
          <LocationCard
            lat={partyPosition.lat !== undefined ? partyPosition.lat : 0}
            lon={partyPosition.lon !== undefined ? partyPosition.lon : 0}
            name={partyData.name !== undefined ? partyData.name : ""}
            address={
              partyData.address !== undefined ? partyData.address.street : ""
            }
          ></LocationCard>
        </Col>
      </Row>
    </Container>
  );
}

export default Party;
