
export default function MessageBox(message:{message:{type: string, message:string, description:string}}){
    let bg = '';
    if(message.message.type === 'success'){
        bg = 'bg-green-500/80'
    } else if(message.message.type === 'error'){
        bg = 'bg-red-500/60'
    }

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className={`${bg} text-white px-3 py-1 rounded-lg shadow-md`}>
                <h2 className="text-sm lg:text-lg font-bold">{message.message.message}</h2>
                {/* <p>{message.message.description}</p> */}
            </div>
        </div>
    )
}