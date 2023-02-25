export default function AnswerComponent(props) {
  if (props.id !== "") {
    return (
      <p key={props.id}>
        #{props.id}
        &nbsp;
        {props.ans}
      </p>
    );
  } else {
    return null;
  }
}
