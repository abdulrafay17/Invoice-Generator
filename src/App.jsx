import { useState } from "react";
import axios from "axios";
import Pattern from "./components/Pattern.jsx";
import Invoice from "./components/invoice.jsx";
import { totalAmount } from "./utils/uttils.js";


export default function App() {

  const [mode, setMode] = useState(false)

  const from =
        {
            name: 'Weave-Tech Labels',
            email1: 'Abdulmoiz1399@icloud.com',
            email2: 'Abdulmoiz1399@gmail.com',
            address: 'Scheme 33 Sectore 36-A',
            area: 'Gulzare Hijri'
        };

      const [clientData, setClientData] = useState({
          client: '',
          phone: '',
          locationArea: '',
          country: '',
          dueDate: ''
        });

      const [itemDesc, setItemDesc] = useState({
          itemDescription: '',
          quantity: '',
          rate: '',
          amount: ''
        });

      const [items, setItems] = useState([]);
      totalAmount(items);
  
  return (
    <div className={`overflow-x-hidden ${mode ? 'bg-black' : 'bg-white'}`}>
    <Pattern from={from} mode={mode} setMode={setMode} clientData={clientData} setClientData={setClientData} itemDesc={itemDesc} items={items} setItemDesc={setItemDesc} setItems={setItems}/>
    <Invoice from={from} mode={mode} clientData={clientData} items={items} setItems={setItems} />
    </div>
  )
}
