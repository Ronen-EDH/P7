import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../App";
import { Card, Button } from "react-bootstrap";

export function Post({ title, text, file, altText, id }) {
  const [isRead, setIsRead] = useState(false);
  const [renderRead, setRenderRead] = useState(false);

  const { token } = useContext(TokenContext);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { authorization: token, "Content-Type": "application/json" },
    };

    fetch(`http://localhost:3000/api/posts/read/${id}`, options)
      .then((response) => response.json())
      .then((data) => {
        setIsRead(data);
      })
      .catch((err) => {
        console.log("Error: ", err);
        alert("503 - Service Unavailable");
      });
  }, [renderRead]);

  const toggleRead = () => {
    const options = {
      method: "PUT",
      headers: { authorization: token, "Content-Type": "application/json" },
    };

    fetch(`http://localhost:3000/api/posts/read/${id}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRenderRead(true);
      })
      .catch((err) => {
        console.log("Error: ", err);
        alert("503 - Service Unavailable");
      });
  };

  if (!altText) {
    altText = title;
  }

  return (
    <Card className="flex-grow-1 shadow bg-white rounded">
      {file ? <Card.Img variant="top" src={file} alt={altText} /> : null}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {text ? <Card.Text>{text}</Card.Text> : null}
        {isRead ? (
          <Button variant="secondary">Read</Button>
        ) : (
          <Button variant="primary" onClick={() => toggleRead()}>
            Unread
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
