import './App.css';
import { io } from 'socket.io-client'
import {Button} from "reactstrap"
import { useEffect, useState } from 'react';
const socketConnection = io("http://localhost:2000")

function App() {
const [messages, setMessages] = useState([])
function triggerEvent() {
   
  socketConnection.emit("SEND_MESSAGES", {
    message: Date.now().toString()
  })
  socketConnection.emit("my-event", {
    message: "halo apa kabar", 
    user : {
      name : "jason"
    }
  })
}


useEffect(()=>{
socketConnection.on("INIT_MESSAGES" , (data) => {
  setMessages(data)
})

// return () => {
//   socketConnection.disconnect()
// }

}, [])

  return (
    <div>
      <h1>
        test
        {
          messages.map((val) => {
            return <p> {val.message} </p>
          })
        }
      </h1>
      <Button onClick={triggerEvent}>Connect to socket </Button>
    </div>
  );
}

export default App;



//buat lah sebuah sebuah app chat sederhana
//ada user yang join, ada room chat,
//  ada isi chat dalam room
// user
// id , username 

// message
// id , message, userid , room id

// room chat
// roomname, userid 



