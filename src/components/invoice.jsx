import { useRef, useState } from "react";
import { liveDate } from "../utils/uttils";
import { formatDDMMYY } from "../utils/uttils";
import { totalAmount } from "../utils/uttils";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";

export default function Invoice({ from, clientData, items, setItems, mode }) {
    const invoiceRef = useRef();
    const [format, setFormat] = useState('Png');

    function downloadPDF() {
        const element = invoiceRef.current;
        console.log("Element:", element);
        setTimeout(() => {
            html2pdf()
                .set({
                    margin: 0,
                    filename: `Invoice_${clientData.client || "Customer"}.pdf`,
                    image: { type: "png", quality: 1 },
                    html2canvas: { scale: 2, width: 794, height: 1123 },
                    jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" },
                })
                .from(element)
                .save()
            .catch(err => console.error("PDF generation failed:", err));
        }, 100);
    }

    // max-w-4xl mx-auto p-6 shadow-lg rounded-lg my-5
    
        function downloadPNG() {
        const element = invoiceRef.current;

        html2canvas(element, { scale: 2 }).then(canvas => {
            const link = document.createElement("a");
            link.download = `Invoice_${clientData.client || "Customer"}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        }).catch(err => console.error("PNG generation failed:", err));
        }

        function handleDelete(index) {
            setItems(prev => prev.filter((_, i)=> i !== index ))
        }

    return (
        <>
            <div ref={invoiceRef} className='w-[794px] h-[1123px] mx-auto p-6 shadow-lg rounded-lg my-5' style={{ backgroundColor: '#ffffff', boxShadow: '0 0 10px rgba(255, 191, 0, 0.5)' }}>
                <div className="flex flex-col border-b pb-4 mb-6">
                    <div className="w-full flex flex-col items-center">
                        <img src="./logo.svg" alt="Logo" className="h-35" />
                        <h1 className="text-4xl font-bold custom-text-dark">INVOICE</h1>
                    </div>
                </div>
                <div className="text-right">
                        <p className="custom-text-gray font-bold text-xl">DATE: {liveDate()}</p>
                        <p className="custom-text-gray font-bold text-xl">INVOICE: INV-2025{'01'}</p>
                </div>
                <div className="flex justify-between mb-6">
                    
                    <div>
                        <h3 className="text-xl font-bold font-serif custom-text-dark">FROM:</h3>
                        <p className="custom-text-gray text-lg font-semibold">{from.name}</p>
                        <p className="custom-text-gray text-lg font-semibold">{from.email1}</p>
                        <p className="custom-text-gray text-lg font-semibold">{from.email2}</p>
                        <p className="custom-text-gray text-lg font-semibold">{from.address}</p>
                        <p className="custom-text-gray text-lg font-semibold">{from.area}</p>
                    </div>
                    <div className="text-right">
                        <h3 className="text-lg font-bold font-serif custom-text-dark">TO:</h3>
                        <p className="custom-text-gray text-lg font-semibold">{clientData.client}</p>
                        <p className="custom-text-gray text-lg font-semibold">{clientData.phone}</p>
                        <p className="custom-text-gray text-lg font-semibold">{clientData.locationArea}</p>
                        <p className="custom-text-gray text-lg font-semibold">{clientData.country}</p>
                    </div>
                </div>

                <div className="flex justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-semibold font-serif custom-text-dark">TERMS:</h3>
                        <p className="custom-text-gray text-lg font-semibold">Due on Receipt</p>
                    </div>
                    <div className="text-right">
                        <h3 className="text-xl font-semibold font-serif custom-text-dark">DUE:</h3>
                        <p className="custom-text-gray text-lg font-semibold">{formatDDMMYY(clientData.dueDate)}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="custom-bg-lightgray">
                                <th className="text-left p-3 font-bold text-lg custom-text-gray border-1">Item Description</th>
                                <th className="text-right p-3 font-bold text-lg custom-text-gray border-1">Quantity</th>
                                <th className="text-right p-3 font-bold text-lg custom-text-gray border-1">Rate</th>
                                <th className="text-right p-3 font-bold text-lg custom-text-gray border-1">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((i, index) => (
                                <tr key={index} className="border-1">
                                    <td className="p-1">{i.itemDescription}</td>
                                    <td className="p-1 text-right">{i.quantity} PCS</td>
                                    <td className="p-1 text-right">{i.rate}</td>
                                    <td className="p-1 text-right">{i.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="text-right mb-6">
                    <p className="text-xl font-bold custom-text-dark">BALANCE DUE: {totalAmount(items)} PKR</p>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-bold font-serif custom-text-dark">Notes</h3>
                    <p className="custom-text-gray text-lg font-semibold">Thank you for your business. Please contact us if you have any questions about this invoice.</p>
                </div>
            </div>

            {items.map((i, index) => (
                <div key={index} className="flex justify-between w-[794px] mx-auto mb-2">
                    <span className={`${mode ? 'text-white' : 'text-black'}`}>{i.itemDescription} - {i.quantity} PCS</span>
                    <button 
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(index)}
                    >
                    Delete
                    </button>
            </div>
            ))}

            <select name="state" value={format} onChange={(e)=> setFormat(e.target.value)} className="font-bold py-2 px-4 rounded mx-auto block mb-10">
                <option value="Png">PNG</option>
                <option value="Pdf">PDF</option>
            </select>

            <button
                onClick={format === 'Pdf' ? downloadPDF : downloadPNG}
                className="font-bold py-2 px-4 rounded mx-auto block mb-10"
                style={{ backgroundColor: '#059669', color: '#ffffff' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#047857'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            >
                Download {format === 'Png' ? 'PNG' : 'PDF'}
            </button>
        </>
    );
}