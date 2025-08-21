import { useState } from "react";
import axios from "axios";
import Pattern from "./components/Pattern.jsx";
import Invoice from "./components/invoice.jsx";
import { totalAmount } from "./utils/uttils.js";


export default function App() {

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
    <div className="overflow-x-hidden">
    <Pattern from={from} clientData={clientData} setClientData={setClientData} itemDesc={itemDesc} items={items} setItemDesc={setItemDesc} setItems={setItems}/>
    <Invoice from={from} clientData={clientData} items={items} />
    </div>
  )
}
