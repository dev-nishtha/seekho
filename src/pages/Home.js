import React, { useEffect, useMemo, useState } from "react";
import test from "../data/items.js";
import { Container, Button } from "reactstrap";
import AnswerComponent from "../components/AnswerComponent.js";
import "../assets/css/Home.css";
import { Link } from "react-router-dom";

const answerSheet = [];

export default function Home() {
  const [item, setItem] = useState(0);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);
  const [choice, setChoice] = useState("");
  const [current, setCurrent] = useState("");
  const [submit, setSubmit] = useState(false);
  const [score, setScore] = useState(0);
  const [select, setSelect] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    setDisable(true);
    if (answerSheet.length === test.length) {
      setSubmit(true);
    }
    if (answerSheet[item] !== undefined) {
      if (item + 1 === answerSheet[item].id) {
        setDisable(false);
      }
      setSelect(answerSheet[item].ans);
    }
  }, [choice, item]);

  useMemo(() => {
    if (answerSheet[0] !== undefined) {
      if (answerSheet[0].id === "") {
        answerSheet.pop();
      }
    }
    const isPresent = answerSheet.some((a) => a.id === current);
    if (!isPresent) {
      answerSheet.push({ id: current, ans: choice });
    } else {
      answerSheet.map((a) => {
        if (a.id === current) a.ans = choice;
        return a;
      });
    }
  }, [current, choice]);
  function handlePrevClick() {
    if (item - 1 !== 0) {
      setItem(item - 1);
      setNext(true);
    } else {
      setItem(item - 1);
      setPrev(false);
    }
  }
  function handleNextClick() {
    if (item + 1 !== test.length - 1) {
      setItem(item + 1);
      setPrev(true);
    } else {
      setItem(item + 1);
      setNext(false);
    }
  }
  function handleChange(e) {
    let i;
    setChoice(e.target.value);
    setCurrent(test[item].id);

    for (i = 0; i < 4; i++) {
      if (test[item].option[i].value === e.target.value) {
        if (test[item].option[i].isCorrect === true) setScore(score + 1);
      }
    }
  }

  return (
    <Container id="home">
      <div className="answer">
        <p>Review answers here</p>
        {answerSheet.map((a) => {
          return <AnswerComponent key={a.id} id={a.id} ans={a.ans} />;
        })}
      </div>

      <div className="question ">
        <p>Attempt Questions here</p>
        <div className="accessibility">
          {prev && (
            <Button id="prev" onClick={handlePrevClick}>
              &#8592;
            </Button>
          )}
          {next && (
            <Button id="next" onClick={handleNextClick} disabled={disable}>
              &#8594;
            </Button>
          )}
        </div>
        <div key={test[item].id}>
          <p>
            Question #{test[item].id} {test[item].question}
          </p>
          <input
            type="radio"
            name={test[item].id}
            value={test[item].option[0].value}
            onChange={handleChange}
            checked={select === test[item].option[0].value ? true : false}
          />
          <label htmlFor={test[item].option[0].value}>
            {test[item].option[0].value}
          </label>
          <br />
          <input
            type="radio"
            name={test[item].id}
            value={test[item].option[1].value}
            onChange={handleChange}
            checked={select === test[item].option[1].value ? true : false}
          />
          <label htmlFor={test[item].option[1].value}>
            {test[item].option[1].value}
          </label>
          <br />
          <input
            type="radio"
            name={test[item].id}
            value={test[item].option[2].value}
            onChange={handleChange}
            checked={select === test[item].option[2].value ? true : false}
          />
          <label htmlFor={test[item].option[2].value}>
            {test[item].option[2].value}
          </label>
          <br />
          <input
            type="radio"
            name={test[item].id}
            value={test[item].option[3].value}
            onChange={handleChange}
            checked={select === test[item].option[3].value ? true : false}
          />
          <label htmlFor={test[item].option[3].value}>
            {test[item].option[3].value}
          </label>
        </div>

        {submit && (
          <Link to={`/result/${test.length}/${score}`}>
            <Button id="submit">Submit</Button>
          </Link>
        )}
      </div>
    </Container>
  );
}
