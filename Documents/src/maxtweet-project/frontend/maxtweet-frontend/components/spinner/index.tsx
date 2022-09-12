import { ColorRing } from "react-loader-spinner";

export function Spinner() {
  return (
    <div>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["  #7CB9E8", "#6CB4EE", "#72A0C1", "#F0F8FF", "#007FFF "]}
      />
    </div>
  );
}
export function SmallerSpinner() {
  return (
    <div>
      <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["  #7CB9E8", "#6CB4EE", "#72A0C1", "#F0F8FF", "#007FFF "]}
      />
    </div>
  );
}
