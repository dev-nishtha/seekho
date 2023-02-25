import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
import "../assets/css/Result.css";

export default function Result() {
  const { length, score } = useParams();
  let result = score / length;
  return (
    <Container id="result">
      <h2>You have successfully submitted the assesment</h2>
      <p>- Questions asked: {length}</p>
      <p>- Questions correct: {score}</p>
      <p>- Your score: {result * 100}%</p>
    </Container>
  );
}
