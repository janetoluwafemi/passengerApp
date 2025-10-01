"use client"
import {useRouter} from "next/navigation"
import React, {useState} from "react";


const CreatePassenger = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        passengerName: '',
        email: ''
    })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/auth/passenger', {
                body: JSON.stringify(formData),
                method: 'POST',
                headers: { 'Content-Type': 'application/json'
                }
            })
            const responseJson = await response.json()
            alert(responseJson.message)
            router.push('/showRoutes')
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
                           onInvalid={() => console.log("Passenger Name Is Required")}
                           value={formData.passengerName}
                           onChange={(e) => {
                               setFormData((prevState) => ({
                                   ...prevState,
                                   passengerName: e.target.value
                               }))
                           }}
                    ></input>
                </div>
                <div className="">
                    <label>Email: </label>
                    <input type="email" placeholder="Email" required={ true } className="border border-white"
                           onInvalid={() => console.log("Email Is Required")}
                           value={formData.email}
                           onChange={(e) => {
                               setFormData((prevState) => ({
                                   ...prevState,
                                   email: e.target.value
                               }))
                           }}
                    />
                </div>
                <div className="flex justify-center text-center flex-row gap-3">
                    <div className="bg-amber-100 w-1/3">
                        <button className="text-black">Back</button>
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
