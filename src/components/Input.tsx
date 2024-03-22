interface InputProps {
    lblText:string;
   inputText: string;
}

export const Input = ({lblText,inputText}:InputProps) => {


return(
    <>
<label htmlFor="">{lblText}</label>
<input type="text" placeholder={inputText}/> 
</>
)

}