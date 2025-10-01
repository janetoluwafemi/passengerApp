"use client"
import useRouter from "next/router"

const FormData = {
    passengerName: '',
    email: ''
}

const CreatePassenger = () => {
    const router = useRouter
    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/auth/passenger', {
                body: JSON.stringify(FormData),
                method: 'POST',
                headers: { 'Content-Type': 'application/json'
                }
            })
            const responseJson = await response.json()
            alert(responseJson.message)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex justify-center items-center w-full h-screen flex-col gap-5">
            <div className="text-xl font-bold text-center mb-7">Create Account For Passenger</div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="">
                    <label>Passenger Name: </label>
                    <input type="text" placeholder="Passenger Name" required={ true } className="border border-white"
                           onInvalid={() => console.log("Passenger Name Is Required")} ></input>
                </div>
                <div className="">
                    <label>Email: </label>
                    <input type="email" placeholder="Email" required={ true } className="border border-white"
                           onInvalid={() => console.log("Email Is Required")}
                    />
                </div>
                <div className="flex justify-center text-center flex-row gap-3">
                    <div className="bg-amber-100 w-1/3">
                        <button onClick={router.back} className="text-black">Back</button>
                    </div>
                    <div className="bg-white w-1/3">
                        <button type="submit" className="text-black">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePassenger
