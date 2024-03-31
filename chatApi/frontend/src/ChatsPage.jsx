import {PrettyChatWindow} from 'react-chat-engine-pretty'


 
const ChatsPage=(props)=>{
   
    return (
        <div style={{height:'100vh'}}>
           < PrettyChatWindow
           projectId='a460898d-be1b-4c95-8aa1-5038722aceec' 
           username= {props.user.username} 
           secret={props.user.secret}
           style={{height:'100%'}}

           />

        </div>
    )
}

export default ChatsPage
