import {useEffect, useState } from "react";
import Pattern from "./components/Pattern.jsx";
import Invoice from "./components/invoice.jsx";
import { totalAmount } from "./utils/uttils.js";
import Sidebar from "./components/history.jsx";


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
      
      function saveInvoice() {
        const existing = JSON.parse(localStorage.getItem('invoices')) || [];
        const newRecord = {clientData, items}
        localStorage.setItem('invoices', JSON.stringify([...existing, newRecord]));
        setItems([]);
        setClientData({
          client: '',
          phone: '',
          locationArea: '',
          country: '',
          dueDate: ''
        });
      }

      const [historyData, setHistoryData] = useState([])

      useEffect(()=> {
        const data = JSON.parse(localStorage.getItem('invoices')) || [];
        setHistoryData(data)
          
      },[])
      

  
  return (
    <>
    <Sidebar 
      data={historyData} 
      applyItems={(client, invoiceItems) => { 
        setClientData(client); 
        setItems(invoiceItems); 
      }}
      removeInvoice={(index) => {
        const newData = [...historyData];
        newData.splice(index, 1);               // remove from array
        setHistoryData(newData);                // update state
        localStorage.setItem('invoices', JSON.stringify(newData)); // update localStorage
      }}
    />
    <div className={`overflow-x-hidden ${mode ? 'bg-black' : 'bg-white'}`}>
    <Pattern from={from} mode={mode} setMode={setMode} clientData={clientData} setClientData={setClientData} itemDesc={itemDesc} items={items} setItemDesc={setItemDesc} setItems={setItems}/>
    <Invoice from={from} saveInvoice={saveInvoice} mode={mode} clientData={clientData} items={items} setItems={setItems} />
    </div>
    </>
  )
}
