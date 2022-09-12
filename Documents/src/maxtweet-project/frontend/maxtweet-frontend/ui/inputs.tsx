import { SmallerSpinner } from "components/spinner";
import styled from "styled-components";
import { TweetComment } from "ui/buttons";
import styles from "./input.module.css";

type inputWithChildrenProps = {
  children: any;
  placeholder: string;
  className?: string;
  name: string;
  isLoading: boolean;
};
export const Input = styled.input`
  outline: none;
`;

function InputWithChildren(props: inputWithChildrenProps) {
  const style = props.isLoading ? { backgroundColor: "transparent" } : {};
  return (
    <div className={props.className}>
      <CommentInput
        placeholder={props.placeholder}
        style={{ outline: "none" }}
        name={props.name}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {props.children}
        <TweetComment style={style}>
          {props.isLoading ? (
            <div className={styles.spinner_container}>
              <SmallerSpinner />
            </div>
          ) : (
            "Enviar"
          )}
        </TweetComment>
      </div>
    </div>
  );
}
export const CommentInput = styled(Input)`
  background-color: var(--light-gray);
  border: none;
  padding: 10px;
  width: 180px;
  color: var(--black);
  ::placeholder {
    color: var(--gray);
  }
  @media (min-width: 1280px) {
    padding: 0;
  }
`;

export const MakeAComment = styled(InputWithChildren)`
  border-radius: 8px;
  border: none;
  background-color: var(--light-gray);
  width: 280px;
  padding: 5px;
  display: flex;
  align-items: center;
  @media (min-width: 1280px) {
    width: 550px;
    justify-content: space-between;
    padding: 10px;
  }
`;

export const BlandInput = styled(Input)`
  padding: 5px;
  width: 250px;
  border: none;
  background-color: white;
  color: black;
  @media (min-width: 1280px) {
    width: 500px;
    background-color: white;
  }
`;
