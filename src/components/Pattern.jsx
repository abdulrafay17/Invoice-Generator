
import { liveDate } from "../utils/uttils";
import { totalAmount } from "../utils/uttils";

export default function Pattern({from,  clientData, setClientData, itemDesc, setItemDesc, setItems, items}) {

    function handleChange(e) {
        const {name, value} = e.target;

        setClientData(prev => ({...prev, [name]: value}))
    }

    function handleChangeForm(e) {
    const { name, value } = e.target;
    setItemDesc(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!itemDesc.itemDescription || !itemDesc.quantity || !itemDesc.rate) {
            return
        }
        // add the current itemDesc to the items array
        setItems(prevItems => [...prevItems, itemDesc]);
        // reset the input fields
        

        setItemDesc({
            itemDescription: '',
            quantity: '',
            rate: '',
            amount: ''
        });
    }


    

    return (
       <>
        <header className="w-full h-40 flex items-center justify-center"> 
            <img src="./logo.svg" alt=""  className="mt-5 w-[200px] h-[200px]"/>
        </header>
        <div name='date & invoice flex w-full flex-start'>
            <h1 className="text-stone-400 font-serif text-lg md:text-2xl text-left w-full pl-3">Date: {liveDate()}</h1>
        </div>
        <div className="w-screen md:h-80 h-auto flex flex-col md:flex-row">
            <div name='from' className="md:w-1/2 w-full h-auto bg-blue-950 flex flex-col items-center gap-2" >
                <h1 className="text-stone-400 font-serif text-2xl md:text-4xl text-left w-full pl-3">FROM:</h1>
                <input type="text" value={from.name} className=" text-white outline-blue-700 rounded-lg pl-3 md:text-lg text-sm  font-semibold md:w-1/2  w-[200px] bg-stone-900" readOnly/>
                <input type="mail" value={from.email1} className=" text-white outline-blue-700 rounded-lg pl-3 md:text-lg text-sm font-semibold md:w-1/2  w-[200px] bg-stone-900" readOnly/>
                <input type="mail" value={from.email2} className=" text-white outline-blue-700 rounded-lg pl-3 md:text-lg text-sm font-semibold md:w-1/2  w-[200px] bg-stone-900" readOnly/>
                <input type="text" value={from.address} className=" text-white outline-blue-700 rounded-lg pl-3 md:text-lg text-sm font-semibold md:w-1/2  w-[200px] bg-stone-900" readOnly/>
                <input type="text" value={from.area} className=" text-white outline-blue-700 rounded-lg pl-3 md:text-lg text-sm  font-semibold md:w-1/2  w-[200px] bg-stone-900" readOnly/>
                <div className="w-full h-auto">
                    <h1 className="text-stone-400 font-serif text-left w-full pl-3 text-2xl md:text-4xl">Terms:</h1>
                    <h2 className="text-white rounded-lg md:text-lg text-sm font-semibold pl-3 md:w-1/2  w-[200px]">Due on Receipt</h2>
                </div>
            </div>
            <div name='to' className="md:w-1/2 w-full h-auto bg-blue-950 flex flex-col items-center gap-2" >
                <h1 className="text-stone-400 font-serif text-2xl md:text-4xl text-left w-full pl-3">To:</h1>
                <input name="client" type="text" onChange={handleChange} value={clientData.client} placeholder="Name of client..." className=" text-white outline-blue-700 rounded-lg pl-3 md:text-lg text-sm  font-semibold md:w-1/2  w-[200px] bg-stone-900" />
                <input name="phone" type="tel" onChange={handleChange} value={clientData.phone} placeholder="Client ph:...." className=" text-white outline-blue-700 rounded-lg pl-3 md:text-lg text-sm font-semibold md:w-1/2  w-[200px] bg-stone-900" />
                <input name="locationArea" type="text" onChange={handleChange} value={clientData.locationArea} placeholder=" Client Location/Area" className=" text-white outline-blue-700 rounded-lg pl-3 md:text-lg text-sm font-semibold md:w-1/2  w-[200px] bg-stone-900" />
                <input name="country" type="text" onChange={handleChange} value={clientData.country} placeholder="City, Province, Country" className=" text-white outline-blue-700 rounded-lg pl-3 md:text-lg text-sm font-semibold md:w-1/2  w-[200px] bg-stone-900" />
                <div className="w-full  flex flex-col items-center">
                    <h1 className="text-stone-400 font-serif text-left w-full pl-3 text-2xl md:text-4xl">Due:</h1>
                    <input type="date" name="dueDate" onChange={handleChange} value={clientData.dueDate} placeholder="due date" className=" text-stone-700 outline-blue-700 rounded-lg pl-3 md:text-lg text-sm font-semibold md:w-1/2  w-[200px] bg-stone-300" />
                </div>
            </div>
        </div>
        <div className="w-screen md:h-80 h-auto flex flex-col md:flex-row">
           
            <form onSubmit={handleSubmit} name='to' className="md:w-full w-full h-auto bg-red-950 flex flex-col items-center gap-2" >
                <h1 className="text-stone-400 font-serif text-2xl md:text-4xl text-left w-full pl-3">Items:</h1>
                <input name="itemDescription" type="text" onChange={handleChangeForm} value={itemDesc.itemDescription} placeholder="Item Description " className=" text-white outline-blue-700 rounded-lg pl-3 md:text-lg text-sm  font-semibold md:w-1/2  w-[200px] bg-stone-900" />
                <input name="quantity" type="number" onChange={handleChangeForm} value={itemDesc.quantity} placeholder="Quantity" className=" text-white outline-blue-700 rounded-lg pl-3 md:text-lg text-sm font-semibold md:w-1/2  w-[200px] bg-stone-900" />
                <input name="rate" type="number" onChange={handleChangeForm} value={itemDesc.rate} placeholder="Rate" className=" text-white outline-blue-700 rounded-lg pl-3 md:text-lg text-sm font-semibold md:w-1/2  w-[200px] bg-stone-900" />
                <input name="amount" type="number" onChange={handleChangeForm} value={itemDesc.quantity * itemDesc.rate} placeholder="Amount" className=" text-white outline-blue-700 rounded-lg pl-3 md:text-lg text-sm font-semibold md:w-1/2  w-[200px] bg-stone-900" readOnly />
                <div className="w-full flex items-center justify-center">
                    <h1 className="text-stone-400 font-serif pl-3 text-2xl md:text-4xl">Balance Due:</h1>
                    <h3 className="text-stone-400 font-serif pl-3 text-2xl md:text-4xl">{totalAmount(items)}</h3>
                </div>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"> Enter </button>

            </form>
        </div>
        </>
    )
}