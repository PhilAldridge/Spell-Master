import { useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface props {
    input:string
    onChange:(input:string)=>void
    onSubmit:()=>void
}

export default function KeyboardComponent(props:props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const keyboardRef = useRef();


  const onKeyPress = (button:string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{enter}") {
        props.onSubmit()
    };
  };

  return (
    <div className="KeyboardComponent">
      <Keyboard
        keyboardRef={r => (keyboardRef.current = r)}
        layoutName="default"
        onChange={props.onChange}
        onKeyPress={onKeyPress}
        layout={{
            default: [
              "q w e r t y u i o p",
              "a s d f g h j k l",
              "z x c v b n m {backspace}",
              "{enter}"
            ]
          }} 
        display={{
            "{enter}":"Submit Answer",
            "{backspace}":"⌫"
        }}
      />
    </div>
  );
}
